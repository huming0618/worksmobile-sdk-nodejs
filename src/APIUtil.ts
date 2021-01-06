export default class APIUtil {
    static getSendMessageAPIUrl(APIHost:string, apiId:string){
        return `${APIHost}/${apiId}/message/sendMessage/v2`
    }

    static getPushMessageAPIUrl(APIHost:string, apiId:string, botNo:number){
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/message/push`
    }

    static getAddRichMenuUrl(APIHost: string, apiId: string, botNo:number) {
      //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
      return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu`;
    }

    static getSetRichMenuUrl(APIHost: string, apiId: string, botNo:number, richMenuId:number) {
        //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/account/all`;
    }

    static getUploadContentUrl(storageHost: string){
        //http://storage.worksmobile.com/openapi/message/upload.api
        return `${storageHost}/openapi/message/upload.api`;
    }

    static getDefaultRichMenuUrl(APIHost: string, apiId: string, botNo:number, ){
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/account/all`
    }

    static getDefaultRichMenuImageUrl(APIHost: string, apiId: string, botNo:number, richMenuId:number ){
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/content`
    }

    static getSetRichMenuImageUrl(APIHost: string, apiId: string, botNo:number, richMenuId:number){
        return `${APIHost}/r/${apiId}/message/v1/bot/${botNo}/richmenu/${richMenuId}/content`

    }
}
