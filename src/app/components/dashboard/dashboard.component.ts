import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inventarioColor: string = ""
  maquinaColor: string = ""
  proveedorColor: string = ""
  trabajadorColor: string = ""
  reporteColor: string = ""
  puntosV: string = ""
  rol: string;
  mode: string = 'over';
  isAdmin: boolean = false;
  isRecursos: boolean = false
  isEmpleado: boolean = false;
  isAdminP: boolean = false;
  nombre: string;
  decPassword: String = "web"
  constructor(
    private router: Router
  ) {
    this.rol = CryptoJS.AES.decrypt(localStorage.getItem('rol').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

    this.nombre = CryptoJS.AES.decrypt(localStorage.getItem('nombre').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    //console.log(this.nombre)
    if (this.rol == 'ROLE_ADMIN') {
      this.isAdmin = true;
    } else if (this.rol == 'ROLE_EMPLEADO') {
      this.isEmpleado = true;
    } else if (this.rol == 'ROLE_ADMIN_PUNTO') {
      this.isAdminP = true;
    } else if (this.rol == 'ROLE_RECURSO_HUMANO') {
      this.isRecursos = true;
    } else {
      router.navigateByUrl('/login')
    }
  }

  ngOnInit(): void {
    this.onResize();
    // this.clearColor()
    this.changeColor(4)
  }
  changeColor(index: number) {
    this.clearColor()
    switch (index) {
      case 0:
        this.inventarioColor = "#F58F0D"
        break;
      case 1:
        this.maquinaColor = "#F58F0D"
        break;
      case 2:
        this.proveedorColor = "#F58F0D"
        break;
      case 3:
        this.trabajadorColor = "#F58F0D"
        break;
      case 4:
        this.puntosV = "#F58F0D"
        break;
      case 5:
        this.reporteColor = "#F58F0D"
        break;

      default:
        break;
    }


  }
  clearColor() {
    this.inventarioColor = "#66615b"
    this.maquinaColor = "#66615b"
    this.proveedorColor = "#66615b"
    this.trabajadorColor = "#66615b"
    this.reporteColor = "#66615b"
    this.puntosV = "#66615b"
  }
  onResize() {
    let sizeWindow = window.innerWidth;
    if (sizeWindow <= 768) {
      this.mode = 'over';
    } else {
      this.mode = 'side'
    }
  }
}
