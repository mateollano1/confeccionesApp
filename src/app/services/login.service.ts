import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {url} from '../config/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
   }

   login(usuario:User){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(usuario.username + ':' + usuario.password) });
     console.log(headers);

   }

}
