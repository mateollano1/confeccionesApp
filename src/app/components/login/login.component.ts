import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { log } from 'util';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 3;
  public log: FormGroup
  progress:boolean;
  color: ThemePalette ="primary";
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  nombre:string;
  

  isDisabled:boolean=false;

  constructor(private loginService: LoginService,
    private route: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.progress=false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    this.log = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'grant_type': new FormControl('password'),
    });
  }

  login() {
    this.progress=true;
    this.isDisabled=true;
    if (this.log.valid) {
      // console.log(this.log.value);
      this.loginService.login(this.log.value).subscribe(data => {
        console.log(data);
        localStorage.setItem('access_token', data['access_token']);
        localStorage.setItem('rol', data['rol']);
        localStorage.setItem('nombre',data['nombre']+' '+data['apellido']);

    
        console.log(data);
        this.route.navigateByUrl('/dashboard/inventario');
        this.progress=false;

      }, err => {
        if (err.status == 400 || err.status == 401) {
          this.progress=false;
          this.isDisabled=false;
          // console.log("Usuario o contrasela incorrectos");
          this.penSnackBar()
        } else {
          console.log("error en el servidor");
          this.progress=false;
        }
        console.log(err.status);
      })
      //llama servicio
    }else{
      this.progress=true;
      this.isDisabled=false;
      this.penSnackBarValidInputs()
      
    }
    // console.log(this.log);

  }
  penSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  penSnackBarValidInputs() {
    this.progress=false;
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