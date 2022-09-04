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
const chat_schema_db_1 = __importDefault(require("../database/schema/chat.schema.db"));
class Chat {
    getChatsWithPeople(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (((_a = req.body.tokenPayload) === null || _a === void 0 ? void 0 : _a.googleId) ||
                ((_b = req.body.tokenPayload) === null || _b === void 0 ? void 0 : _b.userId));
            const messageList = yield chat_schema_db_1.default
                .find({
                $or: [
                    {
                        from: userId,
                        to: req.query.peopleChatId,
                    },
                    {
                        from: req.query.peopleChatId,
                        to: userId,
                    },
                ],
            })
                .sort({ sendAt: -1 });
            res.json(messageList || []);
        });
    }
    getRecentChatList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userProfile = req.body.tokenPayload;
                const userId = userProfile.googleId || userProfile.userId || '';
                function getTenPeople(currentPeopleCount = 0) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const peopleCount = currentPeopleCount;
                    });
                }
                const peopleList = [];
                let skipSteps = 0;
                while (peopleList.length < 10) {
                    yield chat_schema_db_1.default
                        .find({
                        $or: [
                            {
                                from: { id: userId },
                            },
                            {
                                to: { id: userId },
                            },
                        ],
                    })
                        .limit(20)
                        .skip(skipSteps)
                        .sort({ updatedAt: -1 });
                }
                const allMessage = yield chat_schema_db_1.default
                    .find({
                    $or: [
                        {
                            from: { id: userId },
                        },
                        {
                            to: { id: userId },
                        },
                    ],
                })
                    .limit(20)
                    .sort({ updatedAt: -1 });
                const allPeopleChat = [];
                allMessage.forEach((message) => { });
                res.json(allMessage);
                console.log(allMessage);
            }
            catch (err) {
                console.log(err);
                res.status(500).send('Error while get message list.');
            }
        });
    }
}
exports.default = new Chat();
