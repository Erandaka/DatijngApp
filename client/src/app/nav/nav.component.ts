import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/User';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any;
  username!: string;
  password!: string;
  // currentuser$: Observable<User | null> = of(null);

  constructor(public accountService: AccountService, private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentuser$ = this.accountService.currentUser$;
  }

  login() {
    this.model = { username: this.username, password: this.password }
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (responce) => {
        this.router.navigate(["/members"]);
        console.log(responce);
      },
      error: (error) => {console.log(error),
        this.toaster.error(error.error)}
    });
  }
  logout() {
    this.router.navigate(["/"]);
    this.accountService.logout();
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: user => this.loggedIn = !!user,
  //     error: error => console.log(error)
  //   })
  // }

}
