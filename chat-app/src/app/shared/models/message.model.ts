// src/app/shared/models/message.model.ts
export interface Message {
senderId: any;
  id: string;
  fromId: string;
  toId: string;
  text: string;
  time: string; // ISO string
}



export class SendMessageParam {
    chatid: number = 0;
    chatmassege: string = "";
    fromuserid: number = 0;
    touserid: number = 0;
    togroupid: number = 0;
    isseen: boolean = false;
    chatdate: Date = new Date();
    entrytime: Date = new Date();
    updatetime : Date = new Date();
}