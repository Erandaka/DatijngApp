import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  users: any;
  registerMode = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // getUsers() {
  //   this.http.get("https://localhost:5001/api/users").subscribe({
  //     next: (users) => {
  //       this.users = users
  //     },
  //     error: (error) => { console.log(error) },
  //     complete: () => { console.log("Completed get Users") }
  //   })
  // }
  cancelRegister(event:boolean){
    this.registerMode=event;
  }
}
