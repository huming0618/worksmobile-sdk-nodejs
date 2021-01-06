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
exports.WorksmobileSDK = exports.RichMenuFactory = void 0;
const axios_1 = __importDefault(require("axios"));
const APIUtil_1 = __importDefault(require("./APIUtil"));
const RichMenu_1 = __importDefault(require("./RichMenu"));
exports.RichMenuFactory = RichMenu_1.default;
const jwt = require('jsonwebtoken');
const WORKSMOBILE_API_HOST = 'apis.worksmobile.com';
const WORKSMOBILE_STORAGE_HOST = 'storage.worksmobile.com';
class WorksmobileSDK {
    constructor(apiId, apiConsumerKey, apiAuthToken, option = {}) {
        this.apiId = '';
        this.apiConsumerKey = '';
        this.apiAuthToken = '';
        this.option = { APIHost: WORKSMOBILE_API_HOST, StorageHost: WORKSMOBILE_STORAGE_HOST };
        this.apiId = apiId;
        this.apiConsumerKey = apiConsumerKey;
        this.apiAuthToken = apiAuthToken;
        Object.assign(this.option, option);
    }
    static getJWTAuthToken(auth_host, apiId, privateKey, serverId, createOn = Date.now() / 1000, duration = 300) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { "iss": serverId, "iat": createOn, "exp": createOn + duration };
            const authJWTToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
            const reuslt = axios_1.default.post(`https://${auth_host}/b/${apiId}/server/token`, {
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
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
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
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        };
        return axios_1.default.post(APIUrl, {
            "botNo": botNo,
            "accountId": userId,
            "content": content
        }, { headers });
    }
    updateRichMenuForBot(botNo, richMenu, richMenuImageResourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const addRichMenuAPIUrl = APIUtil_1.default.getAddRichMenuUrl(this.option.APIHost, this.apiId, botNo);
            const headers = {
                "consumerKey": this.apiConsumerKey,
                "Authorization": this.apiAuthToken,
                "Content-type": "application/json"
            };
            const resp = yield axios_1.default.post(addRichMenuAPIUrl, richMenu, { headers });
            if (resp.data && resp.data.richMenuId) {
                yield this.setRichMenuImageForBot(botNo, resp.data.richMenuId, richMenuImageResourceId).catch(e => console.error(e));
                const setRichMenuAPIUrl = APIUtil_1.default.getSetRichMenuUrl(this.option.APIHost, this.apiId, botNo, resp.data.richMenuId);
                const setRichMenuResult = yield axios_1.default.post(setRichMenuAPIUrl, null, { headers }).catch(e => console.error(e));
                return setRichMenuResult;
            }
            else {
                return resp;
            }
        });
    }
    getDefaultRichMenuIdForBot(botNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "consumerKey": this.apiConsumerKey,
                "Authorization": this.apiAuthToken,
                "Content-type": "application/json"
            };
            const url = APIUtil_1.default.getDefaultRichMenuUrl(this.option.APIHost, this.apiId, botNo);
            const resp = yield axios_1.default.get(url, { headers }).catch(e => console.error(e));
            return resp.data && resp.data.richMenuId;
        });
    }
    getRichMenuContentForBot(botNo, richMenuId) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "consumerKey": this.apiConsumerKey,
                "Authorization": this.apiAuthToken,
                "Content-type": "application/json"
            };
            const url = APIUtil_1.default.getDefaultRichMenuImageUrl(this.option.APIHost, this.apiId, botNo, richMenuId);
            const resp = yield axios_1.default.get(url, { headers }).catch(e => console.error(e));
            return resp.data;
        });
    }
    setRichMenuImageForBot(botNo, richMenuId, resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "consumerKey": this.apiConsumerKey,
                "Authorization": this.apiAuthToken,
                "Content-type": "application/json"
            };
            const url = APIUtil_1.default.getSetRichMenuImageUrl(this.option.APIHost, this.apiId, botNo, richMenuId);
            const resp = yield axios_1.default.post(url, { resourceId }, { headers }).catch(e => console.error(e));
            return resp.data;
        });
    }
    uploadContent(name, fileStream) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadUrl = APIUtil_1.default.getUploadContentUrl(this.option.StorageHost);
            const headers = {
                "consumerKey": this.apiConsumerKey,
                "Authorization": this.apiAuthToken,
                "x-works-apiid": this.apiId,
                "Content-Type": 'multipart/form-data'
            };
            const FormData = require('form-data');
            const data = new FormData();
            data.append('resourceName', name);
            data.append(name, fileStream);
            const resp = yield axios_1.default({
                method: 'post',
                url: uploadUrl,
                data: data,
                headers: headers
            })
                .catch(function (response) {
                //handle error
                console.log(response);
            });
            console.log(resp);
        });
    }
}
exports.WorksmobileSDK = WorksmobileSDK;
exports.default = WorksmobileSDK;
