import axios from 'axios'

class WorksmobileSDK{
    apiId:string = ''
    apiConsumerKey: string=''
    apiAuthToken:string = ''
    option:{APIHost:string} = {APIHost:''}

    constructor(apiId: string, apiConsumerKey:string, apiAuthToken: string, option={}){
        this.apiId = apiId
        this.apiConsumerKey = apiConsumerKey
        this.apiAuthToken = apiAuthToken
        Object.assign(this.option, option)
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
