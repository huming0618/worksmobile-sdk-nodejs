import axios from 'axios'
import APIUtil from './APIUtil'
import RichMenuFactory from './RichMenu'
import fs, { ReadStream } from 'fs'
const jwt = require('jsonwebtoken');

const WORKSMOBILE_API_HOST = 'apis.worksmobile.com'
const WORKSMOBILE_STORAGE_HOST = 'storage.worksmobile.com'

class WorksmobileSDK{
    apiId:string = ''
    apiConsumerKey: string=''
    apiAuthToken:string = ''
    option:{APIHost:string, StorageHost:string} = {APIHost:WORKSMOBILE_API_HOST, StorageHost:WORKSMOBILE_STORAGE_HOST}

    constructor(apiId: string, apiConsumerKey:string, apiAuthToken: string, option={}){
        this.apiId = apiId
        this.apiConsumerKey = apiConsumerKey
        this.apiAuthToken = apiAuthToken
        Object.assign(this.option, option)
    }

    static async getJWTAuthToken(auth_host:string, apiId:string, privateKey:string, serverId:string, createOn = Date.now()/1000, duration = 300){
        const payload = {"iss": serverId, "iat": createOn, "exp": createOn + duration}
        const authJWTToken = jwt.sign(payload, privateKey, { algorithm: 'RS256'});

        
        const reuslt = axios.post(`https://${auth_host}/b/${apiId}/server/token`, {
            "grant_type": 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            "assertion": authJWTToken
        })

        return reuslt
        // resp = requests.post('https://auth.worksmobile.com/b/{}/server/token'.format(api_id), {
        // 'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        // 'assertion': jwt_token

    }

    sendBotMessageToRoom(botNo:number, roomId:string, content:string){
        //let APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        let APIUrl = APIUtil.getPushMessageAPIUrl(this.option.APIHost, this.apiId, botNo)
        const headers = { 
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }

        return axios.post(APIUrl, {
            "botNo": botNo,
            "roomId": roomId.toString(),
            "content": content
        }, {headers})
    }

    sendBotMessageToUser(botNo:number, userId:string, content:string){
        //let APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        let APIUrl = APIUtil.getPushMessageAPIUrl(this.option.APIHost, this.apiId, botNo)
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }

        return axios.post(APIUrl, {
            "botNo": botNo,
            "accountId": userId,
            "content": content
        }, {headers})
    }

    async updateRichMenuForBot(botNo:number, richMenu:any, richMenuImageResourceId:string){
        const addRichMenuAPIUrl = APIUtil.getAddRichMenuUrl(this.option.APIHost, this.apiId, botNo)
       
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }

        const resp = await axios.post(addRichMenuAPIUrl, richMenu, {headers})
        if (resp.data && resp.data.richMenuId){
            await this.setRichMenuImageForBot(botNo, resp.data.richMenuId, richMenuImageResourceId).catch(e=>console.error(e))
            const setRichMenuAPIUrl = APIUtil.getSetRichMenuUrl(this.option.APIHost, this.apiId, botNo, resp.data.richMenuId)
            const setRichMenuResult = await axios.post(setRichMenuAPIUrl, null, {headers}).catch(e=>console.error(e))
            return setRichMenuResult
        }
        else {
            return resp
        }
    }

    async getDefaultRichMenuIdForBot(botNo:number){
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }
        const url = APIUtil.getDefaultRichMenuUrl(this.option.APIHost, this.apiId, botNo)
        const resp:any = await axios.get(url, {headers}).catch(e=>console.error(e))
        return resp.data && resp.data.richMenuId
    }

    async getRichMenuContentForBot(botNo:number, richMenuId:number){
        
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }
        const url = APIUtil.getDefaultRichMenuImageUrl(this.option.APIHost, this.apiId, botNo, richMenuId)
        const resp:any = await axios.get(url, {headers}).catch(e=>console.error(e))
        return resp.data
    }

    async setRichMenuImageForBot(botNo:number, richMenuId:number, resourceId:string){
        
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }
        const url = APIUtil.getSetRichMenuImageUrl(this.option.APIHost, this.apiId, botNo, richMenuId)
        const resp:any = await axios.post(url, {resourceId}, {headers}).catch(e=>console.error(e))
        return resp.data
    }

    async uploadContent(name:string, fileStream:ReadStream){
        
        const uploadUrl = APIUtil.getUploadContentUrl(this.option.StorageHost)
       
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "x-works-apiid": this.apiId,
            "Content-Type":'multipart/form-data'
        }

        const FormData = require('form-data');
    
        const data = new FormData();
        data.append('resourceName', name)
        data.append(name, fileStream);

        const resp = await axios({
            method: 'post',
            url: uploadUrl,
            data: data,
            headers: headers
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

        console.log(resp)
    }
}

export default WorksmobileSDK;
export {RichMenuFactory, WorksmobileSDK}
