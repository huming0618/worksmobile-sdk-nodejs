declare class WorksmobileSDK {
    apiId: string;
    apiConsumerKey: string;
    apiAuthToken: string;
    option: {
        APIHost: string;
    };
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: {});
    static getJWTAuthToken(apiId: string, privateKey: string, serverId: string, createOn?: number, duration?: number): Promise<import("axios").AxiosResponse<any>>;
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): void;
    sendBotMessageToUser(botNo: number, userId: string, content: string): void;
}
export default WorksmobileSDK;
