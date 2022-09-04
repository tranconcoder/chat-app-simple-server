"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function setupMongoose() {
    try {
        mongoose_1.default.connect('mongodb+srv://tranvanconkg:Anhnam9ce@cluster0.jiqyhsp.mongodb.net/?retryWrites=true&w=majority', (err) => {
            if (err)
                throw err;
            console.log('Database connect successful');
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.default = setupMongoose;
