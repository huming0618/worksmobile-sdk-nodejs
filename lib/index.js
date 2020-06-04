"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const WORKSMOBILE_API_PREFIX = 'apis.worksmobile.com/r';
class WorksmobileSDK {
    constructor(apiId, apiConsumerKey, apiAuthToken, option = { APIPrefix: WORKSMOBILE_API_PREFIX }) {
        this.apiId = '';
        this.apiConsumerKey = '';
        this.apiAuthToken = '';
        this.option = { APIPrefix: WORKSMOBILE_API_PREFIX };
        this.apiId = apiId;
        this.apiConsumerKey = apiConsumerKey;
        this.apiAuthToken = apiAuthToken;
        Object.assign(this.option, option);
    }
    sendBotMessageToRoom(botNo, roomId, content) {
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIPrefix, this.apiId);
        const headers = {
            consumerKey: this.apiConsumerKey,
            Authorization: this.apiAuthToken,
            'Content-type': 'application/json',
        };
        axios_1.default.post(APIUrl, {
            botNo,
            roomId,
            content
        }, { headers });
    }
    sendBotMessageToUser(botNo, userId, content) {
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIPrefix, this.apiId);
        const headers = {
            consumerKey: this.apiConsumerKey,
            Authorization: this.apiAuthToken,
            'Content-type': 'application/json',
        };
        axios_1.default.post(APIUrl, {
            botNo,
            accountId: userId,
            content
        }, { headers });
    }
}
exports.default = WorksmobileSDK;
