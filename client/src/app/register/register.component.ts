import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHome: any;
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService, private router:Router,private toaster:ToastrService) { }

  ngOnInit(): void {
    console.log(this.usersFromHome);
  }

  username!: string;
  password!: string;


  register() {
    this.accountService.register({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(["/members"]);
        this.cancel();
      },
      error: (error) => {console.log(error),
        this.toaster.error(error.error)}
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
