"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class WorksmobileSDK {
    constructor(apiId, apiConsumerKey, apiAuthToken, option = {}) {
        this.apiId = '';
        this.apiConsumerKey = '';
        this.apiAuthToken = '';
        this.option = { APIHost: '' };
        this.apiId = apiId;
        this.apiConsumerKey = apiConsumerKey;
        this.apiAuthToken = apiAuthToken;
        Object.assign(this.option, option);
    }
    sendBotMessageToRoom(botNo, roomId, content) {
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId);
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        };
        axios_1.default.post(APIUrl, {
            "botNo": botNo,
            "roomId": roomId,
            "content": content
        }, { headers });
    }
    sendBotMessageToUser(botNo, userId, content) {
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId);
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        };
        axios_1.default.post(APIUrl, {
            "botNo": botNo,
            "accountId": userId,
            "content": content
        }, { headers });
    }
}
exports.default = WorksmobileSDK;
