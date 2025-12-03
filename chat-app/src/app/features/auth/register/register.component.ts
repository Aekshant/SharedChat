import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
hidePassword = true;
  constructor(private router: Router) { }

  onRegister() {
    // Add real signup logic here;
    
    this.router.navigate(['/login']);
  }
}
