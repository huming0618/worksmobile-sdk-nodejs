declare type SDKOption = {
    APIPrefix: string;
};
declare class WorksmobileSDK {
    apiId: string;
    apiConsumerKey: string;
    apiAuthToken: string;
<<<<<<< HEAD
    option: SDKOption;
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: SDKOption);
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): void;
    sendBotMessageToUser(botNo: number, userId: string, content: string): void;
=======
    option: {
        APIHost: string;
    };
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: {});
    static getJWTAuthToken(apiId: string, privateKey: string, serverId: string, createOn?: number, duration?: number): Promise<import("axios").AxiosResponse<any>>;
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): Promise<import("axios").AxiosResponse<any>>;
    sendBotMessageToUser(botNo: number, userId: string, content: string): Promise<import("axios").AxiosResponse<any>>;
>>>>>>> 9e0b20b003beb2a6d50fedf3b9c35a05b77c9771
}
export default WorksmobileSDK;
