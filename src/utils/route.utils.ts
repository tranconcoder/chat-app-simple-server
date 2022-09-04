import { Router } from 'express';

export class CustomRoute {
	public readonly Route: Router;

	constructor(router: Router) {
		this.Route = router;
	}

	public handleChildRoute(childRouteClass: any) {
		return new childRouteClass().Route;
	}
}
