import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider';
import { url } from '../config/url';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  
  constructor(private http: HttpClient) { }
  getProviders(): Observable<Provider[]>  {
    return this.http.get(`${url}/api/proveedores/`).pipe( map( (data: any) => {
      return data;
    }) );
  }
}
