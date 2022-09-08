"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStaticFile = exports.setupViewEngine = void 0;
const express_handlebars_1 = require("express-handlebars");
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
function setupViewEngine(app) {
    app.engine('.hbs', (0, express_handlebars_1.engine)({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.set('views', path_1.default.join(__dirname, '../views'));
    handlebars_1.default.registerHelper('toJson', (data) => {
        return JSON.stringify(data);
    });
}
exports.setupViewEngine = setupViewEngine;
function setupStaticFile(app) {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
}
exports.setupStaticFile = setupStaticFile;
