import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maquina } from '../models/machine';
import { encPassword } from '../config/encPassword';
import * as CryptoJS from 'crypto-js';;
import { url } from '../config/url';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private headers;
  constructor(private http:HttpClient) { 
    let token = CryptoJS.AES.decrypt(localStorage.getItem('access_token').trim(), encPassword.trim()).toString(CryptoJS.enc.Utf8);
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` ,
    });
  }

  obtenerInventario(id):Observable<Maquina>{
    return this.http.get(`${url}/api/puntos-de-ventas/${id}/inventario/`,{headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }
  comprarMaquina(compra:any){
    return this.http.post(`${url}/api/compras/`, compra,{headers:this.headers})
  }
}
