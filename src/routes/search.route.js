"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = __importDefault(require("../controllers/search.controller"));
const route_utils_1 = require("../utils/route.utils");
class Search extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.get('/chat', search_controller_1.default.searchChat);
    }
}
exports.default = Search;
