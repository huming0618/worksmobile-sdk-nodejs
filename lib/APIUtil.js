"use strict";
class APIUtil {
    static getSendMessageAPIUrl(APIHost, apiId) {
        return `https://${APIHost}/${apiId}/message/sendMessage/v2`;
    }
}
