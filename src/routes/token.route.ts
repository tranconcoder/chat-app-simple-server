import { CustomRoute } from '../utils/route.utils';
import { Router } from 'express';
import tokenController from '../controllers/token.controller';

class Token extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.get(
			'/get-new-access-token',
			tokenController.getNewAccessToken
		);

		this.Route.get(
			'/get-new-refresh-token',
			tokenController.getNewRefreshToken
		);
	}
}

export default Token;
