import axios from 'axios'
import APIUtil from './APIUtil'

const jwt = require('jsonwebtoken');

const WORKSMOBILE_API_HOST = 'apis.worksmobile.com'

class WorksmobileSDK{
    apiId:string = ''
    apiConsumerKey: string=''
    apiAuthToken:string = ''
    option:{APIHost:string} = {APIHost:WORKSMOBILE_API_HOST,}

    constructor(apiId: string, apiConsumerKey:string, apiAuthToken: string, option={}){
        this.apiId = apiId
        this.apiConsumerKey = apiConsumerKey
        this.apiAuthToken = apiAuthToken
        Object.assign(this.option, option)
    }

    static async getJWTAuthToken(apiId:string, privateKey:string, serverId:string, createOn = Date.now()/1000, duration = 300){
        const payload = {"iss": serverId, "iat": createOn, "exp": createOn + duration}
        const authJWTToken = jwt.sign(payload, privateKey, { algorithm: 'RS256'});

        
        const reuslt = axios.post(`https://alpha-auth.worksmobile.com/b/${apiId}/server/token`, {
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
}

export default WorksmobileSDK
