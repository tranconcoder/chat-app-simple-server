"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const token_utils_1 = require("../utils/token.utils");
function needAuth(req, res, next) {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').at(-1)) || '';
        (0, token_utils_1.verifyToken)(token, 'access');
        const tokenPayload = (0, jsonwebtoken_1.decode)(token);
        req.body.tokenPayload = tokenPayload;
        next();
    }
    catch (err) {
        res.status(500).send('Error while verify account');
    }
}
exports.default = needAuth;
