import axios from 'axios'

const WORKSMOBILE_API_HOST = 'apis.worksmobile.com'

class WorksmobileSDK{
    apiId:string = ''
    apiConsumerKey: string=''
    apiAuthToken:string = ''
    option:{APIHost:string} = {APIHost:WORKSMOBILE_API_HOST}

    constructor(apiId: string, apiConsumerKey:string, apiAuthToken: string, option={}){
        this.apiId = apiId
        this.apiConsumerKey = apiConsumerKey
        this.apiAuthToken = apiAuthToken
        Object.assign(this.option, option)
    }

    static getJWTAuthToken(privateKey:string, createOn = Date.now()/1000, duration = 300){
        const payload = {"iss": server_id, "iat": token_createon, "exp": token_expireon}
        jwt_token = jwt.encode(payload, private_key, algorithm='RS256')
    }

    sendBotMessageToRoom(botNo:number, roomId:string, content:string){
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }
        axios.post(APIUrl, {
            "botNo": botNo,
            "roomId": roomId,
            "content": content
        }, {headers})
    }

    sendBotMessageToUser(botNo:number, userId:string, content:string){
        const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIHost, this.apiId)
        const headers = {
            "consumerKey": this.apiConsumerKey,
            "Authorization": this.apiAuthToken,
            "Content-type": "application/json"
        }
        axios.post(APIUrl, {
            "botNo": botNo,
            "accountId": userId,
            "content": content
        }, {headers})
    }
}

export default WorksmobileSDK
