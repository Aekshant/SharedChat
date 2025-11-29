import { environment } from "../environments/environment";

 
export class ApiEndpoints {
  static login = environment.api.auth.login;
  static register = environment.api.auth.register;

  static getUsers = environment.api.chat.users;
  static getMessages = environment.api.chat.messages;
  static sendMessage = environment.api.chat.sendMessage;
  static insertMessage = environment.api.chat.insertMessage;
}
