"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const token_utils_1 = require("../../utils/token.utils");
const jsonwebtoken_1 = require("jsonwebtoken");
const chat_schema_db_1 = __importDefault(require("../../database/schema/chat.schema.db"));
const validateSchema_config_1 = require("../../config/validateSchema.config");
const jsonschema_1 = require("jsonschema");
function setupSocket(app) {
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer, {
        path: '/socket',
        upgradeTimeout: 3000,
        cors: {
            origin: 'http://localhost:4000',
        },
    });
    io.on('connect', (socket) => {
        var _a;
        try {
            const accessToken = ((_a = socket.request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').at(-1)) || '';
            (0, token_utils_1.verifyToken)(accessToken, 'access');
            let googleProfile = null;
            let localProfile = null;
            const userData = (0, jsonwebtoken_1.decode)(accessToken);
            if (userData.accountType === 'google')
                googleProfile = userData;
            else
                localProfile = userData;
            // Auto join init room
            const initRoom = (googleProfile === null || googleProfile === void 0 ? void 0 : googleProfile.googleId) || (localProfile === null || localProfile === void 0 ? void 0 : localProfile.userId) || '';
            socket.join(initRoom);
            socket.on('send-message', (messageInfo) => {
                const dataToSave = {
                    avatar: (googleProfile === null || googleProfile === void 0 ? void 0 : googleProfile.avatar) || (localProfile === null || localProfile === void 0 ? void 0 : localProfile.avatar) || '',
                    from: (googleProfile === null || googleProfile === void 0 ? void 0 : googleProfile.googleId) || (localProfile === null || localProfile === void 0 ? void 0 : localProfile.userId) || '',
                    to: messageInfo.to,
                    content: messageInfo.content,
                    sendTime: new Date().getTime(),
                };
                const validator = new jsonschema_1.Validator();
                const validateResult = validator.validate(dataToSave, validateSchema_config_1.messageSendedSchema);
                if (!validateResult.valid)
                    return console.log('error while send message!');
                const messageToSave = new chat_schema_db_1.default(dataToSave);
                messageToSave.save();
                // Emit to receiver
                socket
                    .to(messageInfo.to)
                    .emit('receive-message', messageToSave);
            });
        }
        catch (err) {
            socket.disconnect();
        }
    });
    return [httpServer, io];
}
exports.default = setupSocket;
