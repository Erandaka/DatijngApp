import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;


  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit() {
    // this.getUsers();
    this.setCurrentUser();
  }


  setCurrentUser() {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
