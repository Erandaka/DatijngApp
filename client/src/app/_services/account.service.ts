import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:5001/";

  private currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  login(userModel: any) {
    return this.http.post<User>(this.BASE_URL + "api/account/login", userModel).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.next(user);
        }
      })
    )
  }
  register(userModel: any) {
    return this.http.post<User>(this.BASE_URL + "api/account/register", userModel).pipe(
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
