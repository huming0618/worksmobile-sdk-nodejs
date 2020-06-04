import APIUtil from '../APIUtil'

test('My Greeter', () => {
    expect(APIUtil.getSendMessageAPIUrl('API.HOST/r','API_ID')).toBe('https://API.HOST/r/API_ID/message/sendMessage/v2');
});