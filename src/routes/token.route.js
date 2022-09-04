"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const express_1 = require("express");
const token_controller_1 = __importDefault(require("../controllers/token.controller"));
class Token extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.get('/get-new-access-token', token_controller_1.default.getNewAccessToken);
        this.Route.get('/get-new-refresh-token', token_controller_1.default.getNewRefreshToken);
    }
}
exports.default = Token;
