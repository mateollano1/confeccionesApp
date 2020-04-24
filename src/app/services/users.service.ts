import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { url } from '../config/url';
import { Rol } from '../models/rol';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { PuntosVenta } from '../models/puntoVenta';
import { TipoContrato } from '../models/tipoContrato';
import { empleado } from '../models/empleado';
import { log } from 'util';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` ,
    });
   }
  getRoles(): Observable<Rol[]>  {
    return this.http.get(`${url}/api/roles/`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getPuntosVenta(): Observable<PuntosVenta[]> {
    return this.http.get(`${url}/api/puntos-de-ventas/`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getTipoContrato(): Observable<TipoContrato[]>{
    return this.http.get(`${url}/api/contratos/`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getUsuarios(): Observable<empleado>{
    return this.http.get(`${url}/api/usuarios/`, /* {headers:this.headers} */).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getUsuario(id:string): Observable<empleado>{
    return this.http.get(`${url}/api/usuarios/${id}`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  editarUsuario(usuario: empleado, id: string){
    
    return this.http.put(`${url}/api/usuarios/${id}`,usuario)
  }
  crearUsuario(usuario: empleado){
    
    return this.http.post(`${url}/api/usuarios/`,usuario)
  }
  deleteUSer(id: number){
    return this.http.delete(`${url}/api/usuarios/${id}`)
  }
}
