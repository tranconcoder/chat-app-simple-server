import type { Request, Response } from 'express';
import { Validator } from 'jsonschema';

import {
	googleLoginSchema,
	loginSchema,
	registerSchema,
} from '../config/validateSchema.config';
import accountSchemaDb from '../database/schema/account.schema.db';
import authSchemaDb from '../database/schema/auth.schema.db';
import Account from '../types/account';
import { ProfileTransformedGoogle } from '../types/transformers';
import { generateToken } from '../utils/token.utils';

class Auth {
	public async getAuthInfo(req: Request, res: Response) {
		try {
			const validator = new Validator();
			const validateResult = validator.validate(
				googleLoginSchema,
				req.user || {}
			);

			if (!validateResult.valid) {
				return res.status(400).send('Invalid data').end();
			}

			const userInfo = req.user as {
				_doc: ProfileTransformedGoogle;
			} & ProfileTransformedGoogle;
			const profile = userInfo._doc || userInfo;

			const accessToken = generateToken(profile, 'access');
			const refreshToken = generateToken(profile, 'refresh');

			res.render('loginSuccess', {
				profile,
				accessToken,
				refreshToken,
			});
		} catch (err) {
			console.error(err);

			res.status(500).end();
		}
	}

	public async checkUsernameIsExisted(req: Request, res: Response) {
		const username = req.query.username || '';

		if (typeof username !== 'string' || !username) {
			return res.status(400).send('Username invalid!').end();
		}

		const usernameIsUsed = await (
			accountSchemaDb as typeof accountSchemaDb & {
				usernameIsUsed: any;
			}
		).usernameIsUsed(username);

		res.status(200).json(usernameIsUsed).end();
	}

	public async register(req: Request, res: Response) {
		const data = req.body || {};
		const validator = new Validator();

		const validateResult = validator.validate(data, registerSchema);

		if (!validateResult.valid) {
			return res.status(400).send('Data invalid!').end();
		}

		const newAccount = new accountSchemaDb({
			username: data.username,
			password: data.password,
		});
		const usernameIsUsed = await (
			newAccount as typeof newAccount & { usernameIsUsed: any }
		).usernameIsUsed(data.username);

		if (usernameIsUsed)
			return res.status(401).send('Username is used!').end();

		accountSchemaDb.create(
			{ username: data.username, password: data.password },
			(err: any, account: Account) => {
				if (err) return res.status(400).send(err).end();

				authSchemaDb.create(
					{
						userId: account.userId,
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						gender: data.gender,
						accountType: 'local',
					},
					async (err: any) => {
						if (err) {
							await accountSchemaDb.findOneAndDelete({
								username: data.username,
							});

							return res.status(400).send(err).end();
						}

						return res
							.status(200)
							.send('Register successful')
							.end();
					}
				);
			}
		);
	}

	public async login(req: Request, res: Response) {
		const data = req.body;
		const validator = new Validator();

		const validateResult = validator.validate(data, loginSchema);

		if (!validateResult.valid) {
			return res.status(400).send('Data invalid!').end();
		}

		const { username, password } = data;
		const { userId } = ((await accountSchemaDb.findOne({
			username,
			password,
		})) || {}) as Account;

		if (!userId) return res.status(400).end('Not found account!');

		const authInfo: any = await authSchemaDb.findOne({
			userId,
		});

		if (!authInfo) {
			return res.status(500).send('Error while get user profile');
		}

		const accessToken =
			generateToken(authInfo._doc || authInfo, 'access') || '';
		const refreshToken =
			generateToken(authInfo._doc || authInfo, 'refresh') || '';

		res.status(200).json({
			refreshToken,
			accessToken,
		});
	}
}

export default new Auth();
