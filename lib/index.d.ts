declare type SDKOption = {
    APIPrefix: string;
};
declare class WorksmobileSDK {
    apiId: string;
    apiConsumerKey: string;
    apiAuthToken: string;
    option: SDKOption;
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: SDKOption);
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): void;
    sendBotMessageToUser(botNo: number, userId: string, content: string): void;
}
export default WorksmobileSDK;
