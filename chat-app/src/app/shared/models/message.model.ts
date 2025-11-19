// src/app/shared/models/message.model.ts
export interface Message {
senderId: any;
  id: string;
  fromId: string;
  toId: string;
  text: string;
  time: string; // ISO string
}
