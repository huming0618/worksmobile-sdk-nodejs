export default class APIUtil {
    static getSendMessageAPIUrl(APIHost:string, apiId:string){
        return `https://${APIHost}/${apiId}/message/sendMessage/v2`
    }

    static getPushMessageAPIUrl(APIHost:string, apiId:string, botNo:number){
        return `https://${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`
    }
}