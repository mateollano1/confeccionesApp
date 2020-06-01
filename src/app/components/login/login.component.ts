import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 3;
  public log: FormGroup
  progress: boolean;
  color: ThemePalette = "primary";
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  eje: string
  encPassword: string = "web"

  nombre: string;


  isDisabled: boolean = false;

  constructor(private loginService: LoginService,
    private route: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.progress = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    localStorage.removeItem('id');
    localStorage.removeItem('punto_venta');
    this.log = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'grant_type': new FormControl('password'),
    });
  }

  login() {
    this.progress = true;
    this.isDisabled = true;
    if (this.log.valid) {
     
      this.loginService.login(this.log.value).subscribe(data => {
       
        let nombreCompleto = data['nombre'] + ' ' + data['apellido']
        let idPV = data['puntoventa_id'].toString()
        let idUser = data['id'].toString()
        let puntoVenta =  CryptoJS.AES.encrypt(idPV.trim(), this.encPassword.trim()).toString();
        let token = CryptoJS.AES.encrypt(data['access_token'].trim(), this.encPassword.trim()).toString();
        let rol = CryptoJS.AES.encrypt(data['rol'].trim(), this.encPassword.trim()).toString();
        let idU = CryptoJS.AES.encrypt(idUser.trim(), this.encPassword.trim()).toString();
        let nombre = CryptoJS.AES.encrypt(nombreCompleto.trim(), this.encPassword.trim()).toString();
        localStorage.setItem('access_token', token);
        localStorage.setItem('punto_venta', puntoVenta);
        localStorage.setItem('rol', rol);
        localStorage.setItem('id', idU);
        localStorage.setItem('nombre', nombre);


       
        this.progress = false;
        if (data['rol'] == "ROLE_EMPLEADO" || data['rol'] == "ROLE_ADMIN_PUNTO" ) {
          this.route.navigateByUrl('/dashboard/inventario');
        }else if (data['rol'] == "ROLE_RECURSO_HUMANO" ) {
          this.route.navigateByUrl('/dashboard/trabajadores');
        }else if (data['rol'] == "ROLE_ADMIN" ) {
          this.route.navigateByUrl('/dashboard/puntos-de-venta');
        }

      }, err => {
        if (err.status == 400 || err.status == 401) {
          this.progress = false;
          this.isDisabled = false;
         
          this.penSnackBar()
        } else {
          
          this.progress = false;
        }
     
      })
     
    } else {
      this.progress = true;
      this.isDisabled = false;
      this.penSnackBarValidInputs()

    }
    

  }
  penSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  penSnackBarValidInputs() {
    this.progress = false;
    this._snackBar.openFromComponent(ValidInputsComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party">
  Usuario o contraseña incorrectos. 
</span>`,
  styles: [`
    .example-pizza-party {
      color: white;
    }
  `],
})
export class PizzaPartyComponent { }

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="ValidInputs">
  Ingrese usuario y contraseña
</span>`,
  styles: [`
    .ValidInputs {
      color: white;
    }
  `],
})
export class ValidInputsComponent { }

export class ProgressSpinnerConfigurableExample {

}