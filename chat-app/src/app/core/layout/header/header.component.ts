import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any;


  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUser();
    console.log("Current User:", this.user);
  }


  onViewProfile() {
    console.log("View Profile clicked");
    // navigate to profile or open popup
  }

  onLogout() {
    console.log("Logout clicked");
    // perform logout logic;
    this.router.navigate(['/auth/login']);
  }

}
