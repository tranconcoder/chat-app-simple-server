"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mode = (_a = process.env.MODE) === null || _a === void 0 ? void 0 : _a.trim();
const developmentDomain = process.env.DEVELOPMENT_DOMAIN;
const productionDomain = process.env.PRODUCTION_DOMAIN;
console.log(mode);
console.log('production');
const serverDomain = mode === 'development'
    ? developmentDomain + `:${process.env.PORT}`
    : productionDomain;
exports.default = serverDomain;
