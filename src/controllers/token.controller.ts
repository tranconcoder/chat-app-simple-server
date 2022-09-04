import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateToken, verifyToken } from '../utils/token.utils';

class Token {
	public getNewAccessToken(req: Request, res: Response) {
		try {
			const refreshToken = req.headers.authorization?.split(' ').at(-1);

			if (typeof refreshToken !== 'string') throw 'Invalid token';

			verifyToken(refreshToken, 'refresh');

			const { iat, exp, ...payload } = jwt.decode(
				refreshToken
			) as JwtPayload;

			const newAccessToken = generateToken(payload, 'access');

			res.json({ accessToken: newAccessToken });
		} catch (err) {
			res.status(400).json(err);
		}
	}

	public getNewRefreshToken(req: Request, res: Response) {
		try {
			const refreshToken = req.headers.authorization?.split(' ').at(-1);

			if (typeof refreshToken !== 'string') throw 'Invalid token';

			verifyToken(refreshToken, 'refresh');

			const { iat, exp, ...payload } = jwt.decode(
				refreshToken
			) as JwtPayload;

			const newRefreshToken = generateToken(payload, 'refresh');

			res.json({ refreshToken: newRefreshToken });
		} catch (err) {
			res.status(400).json(err);
		}
	}
}

export default new Token();
