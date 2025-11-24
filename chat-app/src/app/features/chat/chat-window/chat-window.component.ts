import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JsonPipe, NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../shared/prime-ng.module';
import { User } from '../../../shared/models/user.model';
import { WebSocketService } from '../../../core/services/websocket.service';
import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    PrimeNgModule,
    FormsModule,
    NgClass,
    JsonPipe,
    NgStyle
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


  constructor(private ws: WebSocketService) {

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
    console.log("Current User in sendMessage:", this.currentUser.userid);
    const payload = {
      from: (this.currentUser).userid,
      to: this.selectedUser.userid,
      text: this.message,
      timestamp: new Date(),
    };
    // this.messages.push(payload); // Optimistic UI update
    this.ws.send(payload);
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes);
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      // this.messages = [];   // Clear previous messages when selected user changes;
      // Listen for incoming messages
      this.sub = this.ws.messages$.subscribe((data) => {
        console.log(data);
        // for (let msg of data) {
        //   try {
        //     const data = JSON.parse(msg);
        //     this.messages.push(data);
        //   } catch (error) {

        //   }

        // }
      });

    }
  }



}
