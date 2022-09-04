import { CustomRoute } from '../utils/route.utils';
import { Router } from 'express';
import Token from './token.route';
import needAuth from '../middlewares/needAuth.middleware';
import Search from './search.route';
import Chat from './chat.route';

class API extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.use('/token', this.handleChildRoute(Token));
		this.Route.use('/search', needAuth, this.handleChildRoute(Search));
		this.Route.use('/chat', needAuth, this.handleChildRoute(Chat));
	}
}

export default API;
