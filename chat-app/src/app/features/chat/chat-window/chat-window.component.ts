import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe, JsonPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { WebSocketService } from '../../../core/services/websocket.service';
import { from, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SendMessageParam } from '../../../shared/models/message.model';
import { ChatService } from '../../../core/services/chat.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgClass,
    NgStyle,
    DatePipe,
    SharedModule
  ],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnChanges {

  @Input() selectedUser: User | any = null;
  currentUser: any = null;
  message: string = '';
  messages: any[] = [];
  private sub!: Subscription;
oldConversation: any[] = [];

  constructor(private ws: WebSocketService,
    private chatService: ChatService,
    private http: HttpClient) {

    this.currentUser = JSON.parse(localStorage.getItem('chat_user')!);

    // Listen for incoming messages
    this.sub = this.ws.messages$.subscribe((data) => {
      for (let msg of data) {
        try {
          const data = JSON.parse(msg);
          this.messages.push(data);
        } catch (error) {

        }

      }
    });


  }

  sendMessage() {
    if (this.message.trim().length === 0) return;
    this.currentUser = JSON.parse(localStorage.getItem('chat_user')!)
    const payload = {
      from: (this.currentUser).userid,
      to: this.selectedUser.userid,
      text: this.message,
      timestamp: new Date(),
    };
    // this.messages.push(payload); // Optimistic UI update
    this.ws.send(payload);


    // 1️⃣ SEND THE CHAT MESSAGE USING YOUR BACKEND
    // (Your normal messaging API, not shown here)
    // this.chatService.sendMessage(receiverId, this.message).subscribe();
    // 2️⃣ SEND PUSH NOTIFICATION
    this.http.post('http://localhost:4000/api/push/send', {
      title: "New Message",
      body: `${this.currentUser.firstname}: ${this.message}`,
      senderId: this.selectedUser.userid
    }).subscribe({
      next: () => console.log("Push sent"),
      error: (err: any) => console.error("Push error:", err)
    });

    this.insertMessage();
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.getChatHistory()
    }
  }


  insertMessage() {
    const messagePayload = new SendMessageParam();
    messagePayload.chatmassege = this.message;
    messagePayload.fromuserid = this.currentUser.userid;
    messagePayload.touserid = this.selectedUser.userid;
    this.chatService.insertMessage(messagePayload).subscribe({
      next: (res) => {
      },
      error: (err) => {
      }
    });
  }


  getChatHistory() {
    if (!this.selectedUser) return;
    this.chatService.getChatHistory(this.currentUser.userid, this.selectedUser.userid).subscribe({
      next: (res: any) => {
        this.messages = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching chat history', err);
      }
    });
  }

}
