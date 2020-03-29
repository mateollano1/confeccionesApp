import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { log } from 'util';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 5;
  public log: FormGroup

  constructor(private loginService: LoginService,
    private route: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    this.log = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'grant_type': new FormControl('password'),
    });
  }

  login() {
    if (this.log.valid) {
      console.log(this.log.value);

      this.loginService.login(this.log.value).subscribe(data => {
        console.log(data);
        localStorage.setItem('access_token', data['access_token']);
        this.route.navigateByUrl('/dashboard')

      }, err => {
        if (err.status == 400 || err.status == 401) {
          console.log("Usuario o contrasela incorrectos");
          this.penSnackBar()
        } else {
          console.log("error en el servidor");

        }
        console.log(err.status);

      })
      //llama servicio
    }else{
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
