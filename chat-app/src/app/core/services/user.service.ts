// src/app/core/services/user.service.ts
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject, firstValueFrom, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Root } from '../../shared/apirequest.model.ts/apiresponse.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users$ = new BehaviorSubject<any[]>([]);

  http = inject(HttpClient);


  private users: User[] = []

  async getUsers(): Promise<Observable<Root>> {
    // return of(this.users).pipe(delay(200));
    return await firstValueFrom(this.http.get<any>(`${environment.api.baseUrl}${environment.api.chat.users}`));
  }

  getUserById(userid: string | number): Observable<User | undefined> {
    return of(this.users.find(u => u.userid === userid));
  }


  loginUser(email: string, password: string): Observable<Root> {
    const payload = {
      emailid: email,
      password: password
    }
    return this.http.post<Root>(`${environment.api.baseUrl}${environment.api.auth.login}`, payload);
  }


   setUsersFromList(users: any[]) {
    this.users$.next(users);
  }

  getUsersFromList() {
    return this.users$.asObservable();
  }

  getUserByIdFromList(id: string) {
    const users = this.users$.getValue();
    return users.find(u => u.id == id);
  }
}