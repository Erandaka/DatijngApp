import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {


  constructor(private http: HttpClient) { }

  BASE_URL = "https://localhost:5001/api/";
  validationErrors:string[]=[];

  get500Error() {
    this.http.get(this.BASE_URL + "buggy/server-error").subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }

  get400Error() {
    this.http.get(this.BASE_URL + "buggy/bad-request").subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }
  get401Error() {
    this.http.get(this.BASE_URL + "buggy/auth").subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }
  get404Error() {
    this.http.get(this.BASE_URL + "buggy/not-found").subscribe({
      next: responce => console.log(responce),
      error: error => console.log(error)
    })
  }
  get400ValidationError() {
    this.http.post(this.BASE_URL + "account/register",{}).subscribe({
      next: responce => console.log(responce),
      error: error => {
        this.validationErrors=error;
      console.log(error)
      }
    })
  }
}
