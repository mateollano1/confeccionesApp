import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { url } from '../config/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('angularapp' + ':' + '12345'),
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }

  login(usuario: User) {
    let body = '';
    for (let key in usuario){
      body += `${key}=${usuario[key]}&`
    }
    return this.http.post(url + "/oauth/token", body, { headers: this.headers })
  } 
}
