import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { PrimeNgModule } from '../../../shared/prime-ng.module';
import { UserService } from '../../../core/services/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    RouterModule],
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
      console.log('in api call')
      console.log("response ==>", response);
      if (response.status) {
        localStorage.setItem('chat_user', JSON.stringify(response.data[0]));
        this.router.navigate(['/chat']);
      }
    })
  }
}
