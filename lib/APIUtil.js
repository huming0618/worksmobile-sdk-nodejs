"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIUtil {
    static getSendMessageAPIUrl(APIHost, apiId, botNo) {
        //return `https://${APIHost}/${apiId}/message/sendMessage/v2`;`
        return `https://${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`
    }
}
exports.default = APIUtil;
