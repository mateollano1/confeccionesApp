import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider';
import { url } from '../config/url';
import {map} from 'rxjs/operators'
import { encPassword } from '../config/encPassword';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private headers;
  constructor(private http: HttpClient) {
    let token = CryptoJS.AES.decrypt(localStorage.getItem('access_token').trim(), encPassword.trim()).toString(CryptoJS.enc.Utf8);

    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` ,
    });
   }

  getProviders(): Observable<Provider[]>  {
    return this.http.get(`${url}/api/proveedores/`,{headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }

  deleteProvider(id: number){
    return this.http.delete(`${url}/api/proveedores/${id}`,{headers:this.headers})
  }

getProveedor(id:string): Observable<Provider>{
    return this.http.get(`${url}/api/proveedores/${id}`,{headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }

  editarProveedor(provider: Provider, id: string){
    return this.http.put(`${url}/api/proveedores/${id}`,provider,{headers:this.headers})
  }

  crearProvider(provider: Provider){
    return this.http.post(`${url}/api/proveedores/`,provider,{headers:this.headers})
  }
}
