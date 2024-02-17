import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  BASE_URL = environment.API_URL;

  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  login(userModel: any) {
    return this.http.post<User>(this.BASE_URL + "account/login", userModel).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    )
  }
  register(userModel: any) {
    return this.http.post<User>(this.BASE_URL + "account/register", userModel).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    )
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUser.next(null);
  }
  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }
}
