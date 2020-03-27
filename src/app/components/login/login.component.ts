import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router} from '@angular/router';
import { from } from 'rxjs';
import { log } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public log: FormGroup
  
  constructor(private loginService:LoginService, private route:Router) { }

  ngOnInit(): void {
    this.log = new FormGroup({
      'username': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'grant_type': new FormControl('password'),
    });
  }

  login(){
    if(this.log.valid){
      console.log(this.log.value);
      
      this.loginService.login(this.log.value).subscribe(data =>{
        console.log("termino");
        
        console.log(data);
        
      })
    //llama servicio
    // this.route.navigateByUrl('/dashboard')
    }
    // console.log(this.log);

  }
  

}
