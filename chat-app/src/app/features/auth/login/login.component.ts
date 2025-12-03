import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { SharedModule } from '../../../shared/shared.module';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public router: Router,
    private userService: UserService

  ) { }

  onSubmit() {

    this.userService.loginUser(this.email, this.password).subscribe((response) => {
      if (response.status) {
        localStorage.setItem('chat_user', JSON.stringify(response.data[0]));
        this.router.navigate(['/chat']);
      }
    })
  }
}
