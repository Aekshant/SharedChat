import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { Root } from '../../../shared/apirequest.model.ts/apiresponse.model';
import { WebSocketService } from '../../../core/services/websocket.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf, SharedModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userResponse!: Root;


  @Output() userSelected = new EventEmitter<any>();


  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private ws: WebSocketService
  ) { }



  ngOnInit(): void {
    this.getAllUsers();
  }


  selectUser(user: any) {
    this.userSelected.emit(user);
    this.router.navigate(['/chat/room', user.userid]);

  }



  getAllUsers() {
    // Fetch users from the UserService
    this.userService.getUsers().then((response: any) => {
      this.userResponse = response;

      this.userService.setUsersFromList(this.userResponse.data);
    });



  }
}
