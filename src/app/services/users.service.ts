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
  getPuntosVenta(): Observable<PuntosVenta[]> {
    return this.http.get(`${url}/api/puntosDeVenta`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getTipoContrato(): Observable<TipoContrato[]>{
    return this.http.get(`${url}/api/contratos`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  getUsuarios(): Observable<empleado>{
    return this.http.get(`${url}/api/usuarios`).pipe( map( (data: any) => {
      return data;
    }) );
  }
  crearUsuario(usuario: empleado, rolId:string, contratoId:string, puntoVentaId:string){
    // console.log(`${url}/api/usuario/?rolId=${rolId}&contratoId=${contratoId}&puntoVentaId=${puntoVentaId}`);
    
    return this.http.post(`${url}/api/usuario/?rolId=${rolId}&contratoId=${contratoId}&puntoVentaId=${puntoVentaId}`,usuario)
  }
  deleteUSer(id: number){
    return this.http.delete(`${url}/api/usuario/${id}`)
  }
}
