import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Maquina } from '../models/machine';
import { url } from '../config/url';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private headers;
  constructor(private http:HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}` ,
    });

  }

  crearMaquina(maquina:Maquina){
    return this.http.post(`${url}/api/maquinas/`, maquina,{headers:this.headers})
  }

  obtenerMaquinas():Observable<Maquina>{
    console.log(this.headers);
    
    return this.http.get(`${url}/api/maquinas/`,{headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }

  borrarMaquina(id:number){
    return this.http.delete(`${url}/api/maquinas/${id}`, {headers:this.headers})
  }

  obtenerMaquina(id:string):Observable<Maquina>{
    return this.http.get(`${url}/api/maquinas/${id}`, {headers:this.headers}).pipe( map( (data: any) => {
      return data;
    }) );
  }
  editarMaquina(maquina: Maquina, id: string){
    return this.http.put(`${url}/api/maquinas/${id}`,maquina,{headers:this.headers})
  }
}
