import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { UserListComponent } from '../user-list/user-list.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatWindowComponent ,
    UserListComponent,
    NgClass
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {

  selectedUser: any = null;
  sidebarOpen = false; // for mobile

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


}
