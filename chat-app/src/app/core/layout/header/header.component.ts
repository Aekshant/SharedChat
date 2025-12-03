import { SharedModule } from './../../../shared/shared.module';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any;


  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUser();
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
