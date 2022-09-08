"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const common_util_1 = require("../../utils/common.util");
const authSchema = new mongoose_1.Schema({
    googleId: { type: String },
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String, required: true },
    fullName: { type: String },
    fullNameNoAccent: { type: String },
    email: { type: String, required: true },
    gender: { type: String },
    avatar: {
        type: String,
        default: 'images/default-avatar.png',
    },
    birthDay: {
        day: { type: Number },
        month: { type: Number },
        year: { type: Number },
    },
    accountType: {
        type: String,
        required: true,
        enum: ['google', 'local'],
    },
});
authSchema.index({ fullName: 'text' });
authSchema.pre('save', function () {
    this.fullName = `${this.firstName ? this.firstName + ' ' : ''}${this.lastName}`;
    this.fullNameNoAccent = (0, common_util_1.toLowerCaseNonAccentVietnamese)(this.fullName);
});
exports.default = mongoose_1.default.model('auth', authSchema);
