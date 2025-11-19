// src/app/core/services/chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../shared/models/message.model';
// import { v4 as uuidv4 } from 'uuid'; // optional - install uuid or use simple id generator

@Injectable({ providedIn: 'root' })
export class ChatService {
  // store messages in-memory (replace with websocket in prod)
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {}

  sendMessage(fromId: string, toId: string, text: string) {
    const msg: Message = {
      id: (Math.random() + Date.now()).toString(36),
      fromId,
      toId,
      text,
      time: new Date().toISOString(),
      senderId: undefined
    };
    this.messages = [...this.messages, msg];
    this.messagesSubject.next(this.messages);
  }

  // get conversation between two users
  getConversation(userA: string, userB: string): Message[] {
    return this.messages.filter(m =>
      (m.fromId === userA && m.toId === userB) || (m.fromId === userB && m.toId === userA)
    );
  }

  // OPTIONAL: real socket example (comment)
  /*
  // import { io, Socket } from 'socket.io-client';
  private socket: Socket;

  connect(token: string) {
    this.socket = io('http://localhost:3000', { auth: { token } });
    this.socket.on('message', (msg) => {
      this.messages = [...this.messages, msg];
      this.messagesSubject.next(this.messages);
    });
  }

  sendSocketMessage(payload) {
    this.socket.emit('message', payload);
  }
  */
}
