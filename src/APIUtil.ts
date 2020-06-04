export default class APIUtil {
  static getSendMessageAPIUrl(APIPefix: string, apiId: string) {
    return `https://${APIPefix}/${apiId}/message/sendMessage/v2`;
  }
}
