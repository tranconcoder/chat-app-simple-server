import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (
	payload: JwtPayload,
	type: 'access' | 'refresh'
) => {
	try {
		const ACCESS_TOKEN_EXPIRED_TIME = 3 * 60 * 1000;
		const REFRESH_TOKEN_EXPIRED_TIME = 1 * 60 * 60 * 1000;

		const expiresTime =
			type === 'access'
				? ACCESS_TOKEN_EXPIRED_TIME
				: REFRESH_TOKEN_EXPIRED_TIME;
		const secretKey = (
			type === 'access'
				? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
				: process.env.JWT_REFRESH_TOKEN_SECRET_KEY
		) as string;

		const token = jwt.sign(payload, secretKey, {
			expiresIn: expiresTime,
		});

		return token;
	} catch (err) {
		console.error(err);
	}
};

export const verifyToken = (token: string, type: 'access' | 'refresh') => {
	const secretKey = (
		type === 'access'
			? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
			: process.env.JWT_REFRESH_TOKEN_SECRET_KEY
	) as string;

	jwt.verify(token, secretKey);
};
