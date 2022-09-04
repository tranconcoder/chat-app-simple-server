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
const auth_schema_db_1 = __importDefault(require("../database/schema/auth.schema.db"));
const common_util_1 = require("../utils/common.util");
class Search {
    searchChat(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nameToSearch = (((_a = req.query) === null || _a === void 0 ? void 0 : _a.search) || '');
                const userSearchListResult = yield auth_schema_db_1.default
                    .find({
                    fullNameNoAccent: {
                        $regex: (0, common_util_1.toLowerCaseNonAccentVietnamese)(nameToSearch.trim()),
                        $options: 'i',
                    },
                })
                    .limit(10);
                res.json(userSearchListResult);
            }
            catch (err) {
                console.error(err);
                res.status(500).json(err);
            }
        });
    }
}
exports.default = new Search();
