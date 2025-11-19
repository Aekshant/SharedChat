import { Component, Input } from '@angular/core';
import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../../shared/prime-ng.module';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgClass,
    PrimeNgModule,
    FormsModule,
    JsonPipe],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

  @Input() selectedUser: any = null;

  message: string = '';
  messages: any[] = [];

  sendMessage() {
    if (!this.message.trim()) return;

    this.messages.push({
      text: this.message,
      mine: true,
      time: new Date()
    });

    this.message = '';
  }
}
