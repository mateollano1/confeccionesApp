import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public log: FormGroup
  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.log = new FormGroup({
      'username': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required)
    });
  }

  login(){
    if(this.log.valid){
      this.loginService.login(this.log.value)
    //llama servicio
    }
    console.log(this.log);

  }
  

}
