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

  constructor(private http: HttpClient) { }
  getPuntosVenta(): Observable<Provider[]>  {
    return this.http.get(`${url}/api/puntos-de-ventas/`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getPuntoVenta(id: string)  {
    return this.http.get(`${url}/api/puntos-de-ventas/${id}`)
  }
  crearPuntoVenta(punto: PuntosVenta){
    return this.http.post(`${url}/api/puntos-de-ventas/`,punto)
  }
  deletePuntoVenta(id: number){
    return this.http.delete(`${url}/api/puntos-de-ventas/${id}`)
  }
  editarPuntoVenta(punto: PuntosVenta, id: string){
    return this.http.put(`${url}/api/puntos-de-ventas/${id}`,punto)
  }
}
