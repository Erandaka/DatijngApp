import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  BASE_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.BASE_URL + 'users');
  }

  getMember(userName: string) {
    return this.http.get<Member>(this.BASE_URL + 'users/' + userName);
  }

}
