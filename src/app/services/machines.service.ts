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

  constructor(private http:HttpClient) {}

  crearMaquina(maquina:Maquina){
    return this.http.post(`${url}/api/maquinas/`, maquina)
  }

  obtenerMaquinas():Observable<Maquina>{
    return this.http.get(`${url}/api/maquinas/`).pipe( map( (data: any) => {
      return data;
    }) );
  }

}
