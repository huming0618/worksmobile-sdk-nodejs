import axios from 'axios';

const WORKSMOBILE_API_PREFIX = 'apis.worksmobile.com/r';

type SDKOption = {
  APIPrefix: string;
};

class WorksmobileSDK {
  apiId: string = '';
  apiConsumerKey: string = '';
  apiAuthToken: string = '';
  option: SDKOption = { APIPrefix: WORKSMOBILE_API_PREFIX };

  constructor(
    apiId: string,
    apiConsumerKey: string,
    apiAuthToken: string,
    option: SDKOption = { APIPrefix: WORKSMOBILE_API_PREFIX },
  ) {
    this.apiId = apiId;
    this.apiConsumerKey = apiConsumerKey;
    this.apiAuthToken = apiAuthToken;
    Object.assign(this.option, option);
  }

  sendBotMessageToRoom(botNo: number, roomId: string, content: string) {
    const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIPrefix, this.apiId);
    const headers = {
      consumerKey: this.apiConsumerKey,
      Authorization: this.apiAuthToken,
      'Content-type': 'application/json',
    };
    axios.post(
      APIUrl,
      {
        botNo,
        roomId,
        content
      },
      { headers },
    );
  }

  sendBotMessageToUser(botNo: number, userId: string, content: string) {
    const APIUrl = APIUtil.getSendMessageAPIUrl(this.option.APIPrefix, this.apiId);
    const headers = {
      consumerKey: this.apiConsumerKey,
      Authorization: this.apiAuthToken,
      'Content-type': 'application/json',
    };
    axios.post(
      APIUrl,
      {
        botNo,
        accountId: userId,
        content
      },
      { headers },
    );
  }
}

export default WorksmobileSDK;
