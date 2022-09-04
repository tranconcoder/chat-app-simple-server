import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import RouteIndex from './routes/index.route';
import { setupStaticFile, setupViewEngine } from './utils/setup.util';
import setupSocket from './services/socket/setup.socket';
import setupMongoose from './database/mongo.db';

dotenv.config();

// Express server
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Setup server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupMongoose();
setupViewEngine(app);
setupStaticFile(app);

// Handle redirect route
const routeIndex = new RouteIndex(app);
routeIndex.listenRoutes();

// Setup socket io
const [httpServer, io] = setupSocket(app);
httpServer.listen(PORT, () => {
	console.log(`Server is running: http://localhost:${PORT}`);
});

export { app, io };
