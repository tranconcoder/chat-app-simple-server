import type { Application } from 'express';

import { engine } from 'express-handlebars';
import handlebars from 'handlebars';
import path from 'path';
import express from 'express';

export function setupViewEngine(app: Application) {
	app.engine('.hbs', engine({ extname: '.hbs' }));
	app.set('view engine', '.hbs');
	app.set('views', path.join(__dirname, '../views'));
	handlebars.registerHelper('toJson', (data) => {
		return JSON.stringify(data);
	});
}

export function setupStaticFile(app: Application) {
	app.use(express.static(path.join(__dirname, '../public')));
}
