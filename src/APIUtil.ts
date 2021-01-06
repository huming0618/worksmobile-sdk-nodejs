export default class APIUtil {
    static getSendMessageAPIUrl(APIHost:string, apiId:string){
        return `${APIHost}/${apiId}/message/sendMessage/v2`
    }

    static getPushMessageAPIUrl(APIHost:string, apiId:string, botNo:number){
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`
    }

    static getRichMenuUrl(APIHost: string, apiId: string, botNo:number) {
      //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
      return `https://${APIHost}/${apiId}/message/v1/bot/${botNo}/richmenu`;
    }
}
