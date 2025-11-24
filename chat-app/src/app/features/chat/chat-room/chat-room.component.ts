import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { UserListComponent } from '../user-list/user-list.component';
import { JsonPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../../core/services/websocket.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatWindowComponent,
    UserListComponent,
    NgClass,
    NgIf, NgStyle],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  selectedUser: any = null;
  sidebarOpen = false; // for mobile

  roomId!: string;
  messages: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private ws: WebSocketService
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    // const WS_URL = `ws://localhost:8000/chat?room=${this.roomId}`;
    const WS_URL = `ws://localhost:8080`;

    this.ws.connect(WS_URL);

    this.ws.messages$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }


  onUserSelected(user: any) {
    this.selectedUser = user;

    // Close sidebar automatically on mobile
    if (window.innerWidth < 768) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth < 768) {
      this.sidebarOpen = false;
    }
  }


  ngOnDestroy() {
    this.ws.close();
  }

}
