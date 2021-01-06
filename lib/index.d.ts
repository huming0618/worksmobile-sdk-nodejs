/// <reference types="node" />
import RichMenuFactory from './RichMenu';
import { ReadStream } from 'fs';
declare class WorksmobileSDK {
    apiId: string;
    apiConsumerKey: string;
    apiAuthToken: string;
    option: {
        APIHost: string;
        StorageHost: string;
    };
    constructor(apiId: string, apiConsumerKey: string, apiAuthToken: string, option?: {});
    static getJWTAuthToken(auth_host: string, apiId: string, privateKey: string, serverId: string, createOn?: number, duration?: number): Promise<import("axios").AxiosResponse<any>>;
    sendBotMessageToRoom(botNo: number, roomId: string, content: string): Promise<import("axios").AxiosResponse<any>>;
    sendBotMessageToUser(botNo: number, userId: string, content: string): Promise<import("axios").AxiosResponse<any>>;
    updateRichMenuForBot(botNo: number, richMenu: any, richMenuImageResourceId: string): Promise<void | import("axios").AxiosResponse<any>>;
    getDefaultRichMenuIdForBot(botNo: number): Promise<any>;
    getRichMenuContentForBot(botNo: number, richMenuId: number): Promise<any>;
    setRichMenuImageForBot(botNo: number, richMenuId: number, resourceId: string): Promise<any>;
    uploadContent(name: string, fileStream: ReadStream): Promise<void>;
}
export default WorksmobileSDK;
export { RichMenuFactory, WorksmobileSDK };
