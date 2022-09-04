import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { verifyToken } from '../utils/token.utils';

export default function needAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization?.split(' ').at(-1) || '';

		verifyToken(token, 'access');

		const tokenPayload = decode(token);

		req.body.tokenPayload = tokenPayload;

		next();
	} catch (err) {
		res.status(500).send('Erro while verify account');
	}
}
