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
const axios_1 = __importDefault(require("axios"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_schema_db_1 = __importDefault(require("../database/schema/auth.schema.db"));
const auth_transformer_1 = require("../transformers/auth.transformer");
const serverDomain_config_1 = __importDefault(require("../config/serverDomain.config"));
dotenv_1.default.config();
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${serverDomain_config_1.default}/auth/google/callback`,
}, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const peopleApiResult = yield axios_1.default.get(`https://people.googleapis.com/v1/people/${profile.id}`, {
        params: {
            personFields: 'birthdays,genders',
            sources: 'READ_SOURCE_TYPE_PROFILE',
        },
        headers: {
            authorization: 'Bearer ' + accessToken,
        },
    });
    const userInAuthDb = yield auth_schema_db_1.default.findOne({
        googleId: profile.id,
    });
    if (!userInAuthDb) {
        const newUserData = (0, auth_transformer_1.profileTransformer)(Object.assign(Object.assign({}, profile), { accountType: 'google', gender: ((_a = peopleApiResult.data) === null || _a === void 0 ? void 0 : _a.genders[0].value) || '', birthDay: ((_b = peopleApiResult.data) === null || _b === void 0 ? void 0 : _b.birthdays[0].date) || {} }));
        const newUser = new auth_schema_db_1.default(newUserData);
        yield newUser.save();
        cb(null, newUserData);
    }
    else {
        cb(null, userInAuthDb);
    }
})));
exports.default = passport_1.default;
