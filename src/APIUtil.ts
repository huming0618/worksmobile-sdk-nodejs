export default class APIUtil {
  static getSendMessageAPIUrl(APIPefix: string, apiId: string) {
    return `https://${APIPefix}/${apiId}/message/sendMessage/v2`;
  }

  static getRichMenuUrl(APIPefix: string, apiId: string, botNo:number) {
    //https://apis.worksmobile.com/r/{API ID}/message/v1/bot/{botNo}/richmenu
    return `https://${APIPefix}/${apiId}/message/v1/bot/${botNo}/richmenu`;
  }
}
