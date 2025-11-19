import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { NgFor } from '@angular/common';
import { PrimeNgModule } from '../../../shared/prime-ng.module';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor,
    PrimeNgModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
 


  @Output() userSelected = new EventEmitter<any>();


  users = [
    { id: 1, name: "John Doe", avatar: "", lastMessage: "Hello!" },
    { id: 2, name: "Sarah Smith", avatar: "", lastMessage: "How are you?" },
    { id: 3, name: "Mark Wilson", avatar: "", lastMessage: "Let's talk!" }
  ];


  constructor(private router:Router) {}
  selectUser(user: any) {

    console.log(user)
    this.userSelected.emit(user);
    this.router.navigate(['/chat/room', user.id]);

  }
}
