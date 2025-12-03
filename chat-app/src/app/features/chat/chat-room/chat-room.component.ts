import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { UserListComponent } from '../user-list/user-list.component';
import { JsonPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../../core/services/websocket.service';
import { PushService } from '../../../core/services/push.service';
import { UserService } from '../../../core/services/user.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatWindowComponent,
    UserListComponent,
    SharedModule
  ,NgIf],
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
    private ws: WebSocketService,
    private pushService: PushService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
    
    
    this.roomId = this.route.snapshot.params['id'];
    
    if (this.roomId) {
      this.selectUserById(this.roomId);
      this.pushService.subscribeToNotifications();
    }
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

  private selectUserById(id: any) {
    // If you have user list already loaded:
    // Example where your user list comes from a service:
    this.userService.getUsersFromList().subscribe((users: any) => {
      try {
        this.selectedUser = users.find((u: any) => u.userid === +(id));
      } catch (error) {
      }
    });

  }
  isDesktop = window.innerWidth >= 768;

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 768;
  }
 

}
