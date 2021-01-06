"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIUtil {
    static getSendMessageAPIUrl(APIHost, apiId) {
        return `${APIHost}/${apiId}/message/sendMessage/v2`;
    }
    static getPushMessageAPIUrl(APIHost, apiId, botNo) {
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`;
    }
}
exports.default = APIUtil;
