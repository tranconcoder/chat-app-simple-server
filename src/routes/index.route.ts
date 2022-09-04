import type { Express } from 'express';
import { CustomRoute } from '../utils/route.utils';
import API from './api.route';
import Auth from './auth.route';
import Home from './home.route';

class IndexRoute extends CustomRoute {
	constructor(app: Express) {
		super(app);
	}

	public listenRoutes() {
		this.Route.use('/', this.handleChildRoute(Home));
		this.Route.use('/auth', this.handleChildRoute(Auth));
		this.Route.use('/api', this.handleChildRoute(API));
	}
}

export default IndexRoute;
