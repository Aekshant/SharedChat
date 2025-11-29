// src/app/core/services/chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, SendMessageParam } from '../../shared/models/message.model';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../api-endpoints';
import { environment } from '../../../environments/environment';
// import { v4 as uuidv4 } from 'uuid'; // optional - install uuid or use simple id generator

@Injectable({ providedIn: 'root' })
export class ChatService {
  // store messages in-memory (replace with websocket in prod)
  private messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) { }

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


  insertMessage(payload: SendMessageParam) : Observable<any> {
   return this.http.post(`${environment.api.baseUrl}${ApiEndpoints.insertMessage}`, payload);
  }

}
