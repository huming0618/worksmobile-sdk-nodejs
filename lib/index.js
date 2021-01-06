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
const APIUtil_1 = __importDefault(require("./APIUtil"));
const jwt = require('jsonwebtoken');
const WORKSMOBILE_API_HOST = 'apis.worksmobile.com';
class WorksmobileSDK {
    constructor(apiId, apiConsumerKey, apiAuthToken, option = { APIPrefix: WORKSMOBILE_API_PREFIX }) {
        this.apiId = '';
        this.apiConsumerKey = '';
        this.apiAuthToken = '';
        this.option = { APIHost: WORKSMOBILE_API_HOST, };
        this.apiId = apiId;
        this.apiConsumerKey = apiConsumerKey;
        this.apiAuthToken = apiAuthToken;
        Object.assign(this.option, option);
    }
    static getJWTAuthToken(apiId, privateKey, serverId, createOn = Date.now() / 1000, duration = 300) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { "iss": serverId, "iat": createOn, "exp": createOn + duration };
            const authJWTToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
            const reuslt = axios_1.default.post(`https://alpha-auth.worksmobile.com/b/${apiId}/server/token`, {
                "grant_type": 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                "assertion": authJWTToken
            });
            return reuslt;
            // resp = requests.post('https://auth.worksmobile.com/b/{}/server/token'.format(api_id), {
            // 'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            // 'assertion': jwt_token
        });
    }
    sendBotMessageToRoom(botNo, roomId, content) {
        //let APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        let APIUrl = APIUtil_1.default.getPushMessageAPIUrl(this.option.APIHost, this.apiId, botNo);
        const headers = {
            consumerKey: this.apiConsumerKey,
            Authorization: this.apiAuthToken,
            'Content-type': 'application/json',
        };
        return axios_1.default.post(APIUrl, {
            "botNo": botNo,
            "roomId": roomId.toString(),
            "content": content
        }, { headers });
    }
    sendBotMessageToUser(botNo, userId, content) {
        //let APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        let APIUrl = APIUtil_1.default.getPushMessageAPIUrl(this.option.APIHost, this.apiId, botNo);
        const headers = {
            consumerKey: this.apiConsumerKey,
            Authorization: this.apiAuthToken,
            'Content-type': 'application/json',
        };
        return axios_1.default.post(APIUrl, {
            "botNo": botNo,
            "accountId": userId,
            "content": content
        }, { headers });
    }
}
exports.default = WorksmobileSDK;
