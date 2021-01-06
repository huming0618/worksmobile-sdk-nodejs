export default class APIUtil {
    static getSendMessageAPIUrl(APIHost: string, apiId: string): string;
    static getPushMessageAPIUrl(APIHost: string, apiId: string, botNo: number): string;
    static getAddRichMenuUrl(APIHost: string, apiId: string, botNo: number): string;
    static getSetRichMenuUrl(APIHost: string, apiId: string, botNo: number, richMenuId: number): string;
    static getUploadContentUrl(storageHost: string): string;
    static getDefaultRichMenuUrl(APIHost: string, apiId: string, botNo: number): string;
    static getDefaultRichMenuImageUrl(APIHost: string, apiId: string, botNo: number, richMenuId: number): string;
    static getSetRichMenuImageUrl(APIHost: string, apiId: string, botNo: number, richMenuId: number): string;
}
