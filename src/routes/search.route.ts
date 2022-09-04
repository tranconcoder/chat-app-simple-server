import { Router } from 'express';
import searchController from '../controllers/search.controller';
import { CustomRoute } from '../utils/route.utils';

class Search extends CustomRoute {
	constructor() {
		super(Router());

		this.handleRoute();
	}

	private handleRoute() {
		this.Route.get('/chat', searchController.searchChat);
	}
}

export default Search;
