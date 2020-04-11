import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { url } from '../config/url';
import { Rol } from '../models/rol';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  getRoles(): Observable<Rol[]>  {
    return this.http.get(`${url}/api/roles`).pipe( map( (data: any) => {
      return data;
    }) );

  }
}
