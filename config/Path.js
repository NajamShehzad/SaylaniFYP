export default class path {
  static BASE_URL = 'https://4f553fa9.ngrok.io';

  static LOGIN_AUTHENTICATION = path.BASE_URL + '/userauth';

  static UPDATE_NUMBER_PROFILE = path.BASE_URL + '/updateData/numberandprofile';

  static ADD_SERVICE = path.BASE_URL + '/service/addservice';

  static GET_USER_SERVICES = path.BASE_URL + '/service/getalluserservices';

  static GET_SERVICES = path.BASE_URL + '/service/getservices';

  static GET_CHAT = path.BASE_URL + '/chat/getchat';
  
  static GET_ALL_CHATS = path.BASE_URL + '/chat/getallchat';

  static SEND_MESSAGE = path.BASE_URL + '/chat/sendmessage';
}