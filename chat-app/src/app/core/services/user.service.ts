// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 'u1', name: 'Alice', email: 'alice@example.com' },
    { id: 'u2', name: 'Bob', email: 'bob@example.com' },
    { id: 'u3', name: 'Charlie', email: 'charlie@example.com' }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(200));
  }

  getUserById(id: string): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id));
  }
}
