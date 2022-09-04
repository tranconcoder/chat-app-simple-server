"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_utils_1 = require("../utils/token.utils");
class Token {
    getNewAccessToken(req, res) {
        var _a;
        try {
            const refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').at(-1);
            if (typeof refreshToken !== 'string')
                throw 'Invalid token';
            (0, token_utils_1.verifyToken)(refreshToken, 'refresh');
            const _b = jsonwebtoken_1.default.decode(refreshToken), { iat, exp } = _b, payload = __rest(_b, ["iat", "exp"]);
            const newAccessToken = (0, token_utils_1.generateToken)(payload, 'access');
            res.json({ accessToken: newAccessToken });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    getNewRefreshToken(req, res) {
        var _a;
        try {
            const refreshToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').at(-1);
            if (typeof refreshToken !== 'string')
                throw 'Invalid token';
            (0, token_utils_1.verifyToken)(refreshToken, 'refresh');
            const _b = jsonwebtoken_1.default.decode(refreshToken), { iat, exp } = _b, payload = __rest(_b, ["iat", "exp"]);
            const newRefreshToken = (0, token_utils_1.generateToken)(payload, 'refresh');
            res.json({ refreshToken: newRefreshToken });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
}
exports.default = new Token();
