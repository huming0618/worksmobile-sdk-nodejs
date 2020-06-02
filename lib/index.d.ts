declare class WorksmobileSDK {
    apiId: string;
    apiConsumerKey: string;
    apiAuthToken: string;
    option: {
        APIHost: string;
    };
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: {});
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): void;
    sendBotMessageToUser(botNo: number, userId: string, content: string): void;
}
export default WorksmobileSDK;
