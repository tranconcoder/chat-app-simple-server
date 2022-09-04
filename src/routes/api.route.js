"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const express_1 = require("express");
const token_route_1 = __importDefault(require("./token.route"));
const needAuth_middleware_1 = __importDefault(require("../middlewares/needAuth.middleware"));
const search_route_1 = __importDefault(require("./search.route"));
const chat_route_1 = __importDefault(require("./chat.route"));
class API extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.use('/token', this.handleChildRoute(token_route_1.default));
        this.Route.use('/search', needAuth_middleware_1.default, this.handleChildRoute(search_route_1.default));
        this.Route.use('/chat', needAuth_middleware_1.default, this.handleChildRoute(chat_route_1.default));
    }
}
exports.default = API;
