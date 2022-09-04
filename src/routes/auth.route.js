"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_utils_1 = require("../utils/route.utils");
const express_1 = require("express");
const passport_1 = __importDefault(require("../passport"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
class Auth extends route_utils_1.CustomRoute {
    constructor() {
        super((0, express_1.Router)());
        this.handleRoute();
    }
    handleRoute() {
        this.Route.get('/', (req, res) => {
            res.json('Hello world!');
        });
        this.Route.get('/google', passport_1.default.authenticate('google', {
            session: false,
            scope: [
                'profile',
                'email',
                'https://www.googleapis.com/auth/user.birthday.read',
                'https://www.googleapis.com/auth/user.gender.read',
            ],
        }));
        this.Route.get('/google/callback', passport_1.default.authenticate('google', {
            session: false,
            failureRedirect: '/login',
        }), auth_controller_1.default.getAuthInfo);
        this.Route.get('/check-user-name', auth_controller_1.default.checkUsernameIsExisted);
        this.Route.post('/register', auth_controller_1.default.register);
        this.Route.post('/login', auth_controller_1.default.login);
    }
}
exports.default = Auth;
