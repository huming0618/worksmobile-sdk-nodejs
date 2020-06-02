class APIUtil {
    static getSendMessageAPIUrl(APIHost:string, apiId:string){
        return `https://${APIHost}/${apiId}/message/sendMessage/v2`
    }
}