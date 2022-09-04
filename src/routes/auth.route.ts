import { CustomRoute } from '../utils/route.utils';
import { Router } from 'express';
import passport from '../passport';

import authController from '../controllers/auth.controller';

class Auth extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.get('/', (req, res) => {
			res.json('Hello world!');
		});
		this.Route.get(
			'/google',
			passport.authenticate('google', {
				session: false,
				scope: [
					'profile',
					'email',
					'https://www.googleapis.com/auth/user.birthday.read',
					'https://www.googleapis.com/auth/user.gender.read',
				],
			})
		);
		this.Route.get(
			'/google/callback',
			passport.authenticate('google', {
				session: false,
				failureRedirect: '/login',
			}),
			authController.getAuthInfo
		);
		this.Route.get(
			'/check-user-name',
			authController.checkUsernameIsExisted
		);

		this.Route.post('/register', authController.register);
		this.Route.post('/login', authController.login);
	}
}

export default Auth;
