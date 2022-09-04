"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controllers/chat.controller"));
class Chat extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.get('/get-chats', chat_controller_1.default.getChatsWithPeople);
        this.Route.get('/get-recent-chat-list', chat_controller_1.default.getRecentChatList);
    }
}
exports.default = Chat;
