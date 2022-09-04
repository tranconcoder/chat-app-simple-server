"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const express_1 = require("express");
class Home extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.get('/', (req, res) => {
            res.json('Hello world!');
        });
    }
}
exports.default = Home;
