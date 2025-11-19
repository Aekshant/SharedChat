// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {}

  private getStoredUser(): User | null {
    const raw = localStorage.getItem('chat_user');
    return raw ? JSON.parse(raw) as User : null;
  }

  login(email: string, password: string): Observable<User> {
    // Replace with real API call.
    const fakeUser: User = { id: 'u1', name: 'Demo User', email, avatar: `https://i.pravatar.cc/40?u=${email}` };
    localStorage.setItem('auth_token', 'fake-jwt-token');
    localStorage.setItem('chat_user', JSON.stringify(fakeUser));
    return of(fakeUser).pipe(
      delay(400),
      tap(u => this.currentUserSubject.next(u))
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    const newUser: User = { id: 'u-' + Math.random().toString(36).slice(2,9), name, email, avatar: `https://i.pravatar.cc/40?u=${email}` };
    // In real app persist user server-side.
    localStorage.setItem('auth_token', 'fake-jwt-token');
    localStorage.setItem('chat_user', JSON.stringify(newUser));
    return of(newUser).pipe(
      delay(400),
      tap(u => this.currentUserSubject.next(u))
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('chat_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
