import { CustomRoute } from '../utils/route.utils';
import { Router } from 'express';

class Home extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.get('/', (req, res) => {
			res.json('Hello world!');
		});
	}
}

export default Home;
