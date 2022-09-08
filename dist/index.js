"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const setup_util_1 = require("./utils/setup.util");
const setup_socket_1 = __importDefault(require("./services/socket/setup.socket"));
const mongo_db_1 = __importDefault(require("./database/mongo.db"));
const serverDomain_config_1 = __importDefault(require("./config/serverDomain.config"));
dotenv_1.default.config();
// Express server
const app = (0, express_1.default)();
exports.app = app;
const PORT = Number(process.env.PORT) || 3000;
// Setup server
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, mongo_db_1.default)();
(0, setup_util_1.setupViewEngine)(app);
(0, setup_util_1.setupStaticFile)(app);
// Handle redirect route
const routeIndex = new index_route_1.default(app);
routeIndex.listenRoutes();
// Setup socket io
const [httpServer, io] = (0, setup_socket_1.default)(app);
exports.io = io;
httpServer.listen(PORT, () => {
    console.log(`Server is running: ${serverDomain_config_1.default}`);
});
