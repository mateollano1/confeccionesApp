import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider';
import { url } from '../config/url';
import {map} from 'rxjs/operators'
import { PuntosVenta } from '../models/puntoVenta';

@Injectable({
  providedIn: 'root'
})
export class SellerPointService {
  private headers;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    });
  }
  getPuntosVenta(): Observable<Provider[]>  {
    return this.http.get(`${url}/api/puntos-de-ventas/`,{headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getPuntoVenta(id: string)  {
    return this.http.get(`${url}/api/puntos-de-ventas/${id}`,{headers:this.headers})
  }
  crearPuntoVenta(punto: PuntosVenta){
    return this.http.post(`${url}/api/puntos-de-ventas/`,punto,{headers:this.headers})
  }
  deletePuntoVenta(id: number){
    return this.http.delete(`${url}/api/puntos-de-ventas/${id}`,{headers:this.headers})
  }
  editarPuntoVenta(punto: PuntosVenta, id: string){
    return this.http.put(`${url}/api/puntos-de-ventas/${id}`,punto,{headers:this.headers})
  }
}
