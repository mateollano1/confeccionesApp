import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { log } from 'util';
import { Rol } from '../../../../models/rol';
import { Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { PuntosVenta } from '../../../../models/puntoVenta';
import { TipoContrato } from '../../../../models/tipoContrato';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  usuario: FormGroup
  roles: Rol[]
  puntos: PuntosVenta[]
  tipo: TipoContrato[]
  id: string
  header: string = ""
  constructor(private usersService: UsersService,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get("id")
    this.createForm()
    this.verifyAction(this.id)
    
  }
  ngOnInit(): void {
    this.getRoles()
    this.getPuntosVenta()
    this.getTipoContrato()
  }
  verifyAction(id: string){
    if (id) {
      console.log("vamos a edtar");
      this.header = "Editar Empleado"
    }else{
      console.log("vamos a crear");
      this.header = "Registrar Empleado"
    }
  }
  createForm(){
    this.usuario = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'usuario': new FormControl('', Validators.required),
      'contrasenia': new FormControl('', Validators.required),
      'correo': new FormControl(''),
      'fechaInicio': new FormControl(''),
      'fechaFinalizacion': new FormControl(''),
      'idRol': new FormControl(''),
      'idContrato': new FormControl(''),
      'idPuntoVenta': new FormControl(''),
      'contraseniaR': new FormControl(''),
    })
  }
  
  getRoles() {
    this.usersService.getRoles().subscribe((data) => {
      this.roles = data
      console.log(this.roles);
    })
  }
  getPuntosVenta() {
    this.usersService.getPuntosVenta().subscribe(data => {
      this.puntos = data['content']
      console.log(this.puntos);

    })
  }
  getTipoContrato() {
    this.usersService.getTipoContrato().subscribe(data => {
      this.tipo = data
      console.log(data);

    })
  }
  save() {
    console.log(this.usuario.value);
    if (this.usuario.valid) {
      if (this.usuario.value['contrasenia'] == this.usuario.value['contraseniaR']) {
        this.usersService.crearUsuario(this.usuario.value, this.usuario.value['idRol'], this.usuario.value['idContrato'], this.usuario.value['idPuntoVenta']).subscribe(data => {
          console.log(data);

        })
      } else {
        console.log("Contraseñas incorrectas");
      }
    } else {
      console.log("Ingrese todo los campos");
    }
  }
}
