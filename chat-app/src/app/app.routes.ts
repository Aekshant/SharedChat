import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserListComponent } from './features/chat/user-list/user-list.component';
import { ChatRoomComponent } from './features/chat/chat-room/chat-room.component';
import { ProfileComponent } from './features/user/profile/profile.component';

export const routes: Routes = [
    {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    children: [
      { path: 'users', component: UserListComponent },
      { path: 'room/:id', component: ChatRoomComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
