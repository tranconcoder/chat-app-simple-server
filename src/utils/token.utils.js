"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, type) => {
    try {
        const ACCESS_TOKEN_EXPIRED_TIME = 3 * 60 * 1000;
        const REFRESH_TOKEN_EXPIRED_TIME = 1 * 60 * 60 * 1000;
        const expiresTime = type === 'access'
            ? ACCESS_TOKEN_EXPIRED_TIME
            : REFRESH_TOKEN_EXPIRED_TIME;
        const secretKey = (type === 'access'
            ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
            : process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
        const token = jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: expiresTime,
        });
        return token;
    }
    catch (err) {
        console.error(err);
    }
};
exports.generateToken = generateToken;
const verifyToken = (token, type) => {
    const secretKey = (type === 'access'
        ? process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        : process.env.JWT_REFRESH_TOKEN_SECRET_KEY);
    jsonwebtoken_1.default.verify(token, secretKey);
};
exports.verifyToken = verifyToken;
