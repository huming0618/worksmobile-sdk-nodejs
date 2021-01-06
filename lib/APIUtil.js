"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIUtil {
    static getSendMessageAPIUrl(APIHost, apiId) {
        return `${APIHost}/${apiId}/message/sendMessage/v2`;
    }
    static getPushMessageAPIUrl(APIHost, apiId, botNo) {
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`;
    }
    static getAddRichMenuUrl(APIHost, apiId, botNo) {
        //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu`;
    }
    static getSetRichMenuUrl(APIHost, apiId, botNo, richMenuId) {
        //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/account/all`;
    }
    static getUploadContentUrl(storageHost) {
        //http://storage.worksmobile.com/openapi/message/upload.api
        return `${storageHost}/openapi/message/upload.api`;
    }
    static getDefaultRichMenuUrl(APIHost, apiId, botNo) {
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/account/all`;
    }
    static getDefaultRichMenuImageUrl(APIHost, apiId, botNo, richMenuId) {
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/content`;
    }
    static getSetRichMenuImageUrl(APIHost, apiId, botNo, richMenuId) {
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/content`;
    }
}
exports.default = APIUtil;
