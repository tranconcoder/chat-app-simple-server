"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonschema_1 = require("jsonschema");
const validateSchema_config_1 = require("../config/validateSchema.config");
const account_schema_db_1 = __importDefault(require("../database/schema/account.schema.db"));
const auth_schema_db_1 = __importDefault(require("../database/schema/auth.schema.db"));
const token_utils_1 = require("../utils/token.utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '../../.env',
});
class Auth {
    getAuthInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validator = new jsonschema_1.Validator();
                const validateResult = validator.validate(validateSchema_config_1.googleLoginSchema, req.user || {});
                if (!validateResult.valid) {
                    return res.status(400).send('Invalid data').end();
                }
                const userInfo = req.user;
                const profile = userInfo._doc || userInfo;
                const accessToken = (0, token_utils_1.generateToken)(profile, 'access');
                const refreshToken = (0, token_utils_1.generateToken)(profile, 'refresh');
                res.render('loginSuccess', {
                    profile: Object.assign({}, profile),
                    postMessageUrlList: JSON.parse(process.env.CORS_LIST || '') || [],
                    accessToken,
                    refreshToken,
                });
            }
            catch (err) {
                console.error(err);
                res.status(500).end();
            }
        });
    }
    checkUsernameIsExisted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.query.username || '';
            if (typeof username !== 'string' || !username) {
                return res.status(400).send('Username invalid!').end();
            }
            const usernameIsUsed = yield account_schema_db_1.default.usernameIsUsed(username);
            res.status(200).json(usernameIsUsed).end();
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body || {};
            const validator = new jsonschema_1.Validator();
            const validateResult = validator.validate(data, validateSchema_config_1.registerSchema);
            if (!validateResult.valid) {
                return res.status(400).send('Data invalid!').end();
            }
            const newAccount = new account_schema_db_1.default({
                username: data.username,
                password: data.password,
            });
            const usernameIsUsed = yield newAccount.usernameIsUsed(data.username);
            if (usernameIsUsed)
                return res.status(401).send('Username is used!').end();
            account_schema_db_1.default.create({ username: data.username, password: data.password }, (err, account) => {
                if (err)
                    return res.status(400).send(err).end();
                auth_schema_db_1.default.create({
                    userId: account.userId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    gender: data.gender,
                    accountType: 'local',
                }, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        yield account_schema_db_1.default.findOneAndDelete({
                            username: data.username,
                        });
                        return res.status(400).send(err).end();
                    }
                    return res
                        .status(200)
                        .send('Register successful')
                        .end();
                }));
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const validator = new jsonschema_1.Validator();
            const validateResult = validator.validate(data, validateSchema_config_1.loginSchema);
            if (!validateResult.valid) {
                return res.status(400).send('Data invalid!').end();
            }
            const { username, password } = data;
            const { userId } = ((yield account_schema_db_1.default.findOne({
                username,
                password,
            })) || {});
            if (!userId)
                return res.status(400).end('Not found account!');
            const authInfo = yield auth_schema_db_1.default.findOne({
                userId,
            });
            if (!authInfo) {
                return res.status(500).send('Error while get user profile');
            }
            const accessToken = (0, token_utils_1.generateToken)(authInfo._doc || authInfo, 'access') || '';
            const refreshToken = (0, token_utils_1.generateToken)(authInfo._doc || authInfo, 'refresh') || '';
            res.status(200).json({
                refreshToken,
                accessToken,
            });
        });
    }
}
exports.default = new Auth();
