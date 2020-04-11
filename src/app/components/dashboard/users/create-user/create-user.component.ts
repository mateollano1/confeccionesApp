import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { log } from 'util';
import { Rol } from '../../../../models/rol';
import { Form, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  usuario: FormGroup
  roles: Rol []
  constructor(private usersService: UsersService) { 
    this.usuario = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'usuario': new FormControl('', Validators.required),
      'contrasena': new FormControl('', Validators.required),
      'fechaInicio': new FormControl(''),
      'fechaFinalizacion': new FormControl(''),
      'idRol': new FormControl(''),
      // 'tipoContrato': new FormControl('', Validators.required),  
    })
  }

  ngOnInit(): void {
    this.getRoles()
  }
  getRoles(){
    this.usersService.getRoles().subscribe((data )=>{
      this.roles = data
      console.log(this.roles);
      
    })
  }
  save(){
console.log(this.usuario.value);

  }
}
