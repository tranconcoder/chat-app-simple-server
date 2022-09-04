"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const api_route_1 = __importDefault(require("./api.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const home_route_1 = __importDefault(require("./home.route"));
class IndexRoute extends route_utils_1.CustomRoute {
    constructor(app) {
        super(app);
    }
    listenRoutes() {
        this.Route.use('/', this.handleChildRoute(home_route_1.default));
        this.Route.use('/auth', this.handleChildRoute(auth_route_1.default));
        this.Route.use('/api', this.handleChildRoute(api_route_1.default));
    }
}
exports.default = IndexRoute;
