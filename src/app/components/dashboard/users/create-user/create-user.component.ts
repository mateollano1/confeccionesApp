import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { log } from 'util';
import { Rol } from '../../../../models/rol';
import { Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { PuntosVenta } from '../../../../models/puntoVenta';
import { TipoContrato } from '../../../../models/tipoContrato';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { empleado } from '../../../../models/empleado';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  usuario: FormGroup
  empleado: empleado
  rol: FormGroup
  roles: Rol[]
  puntos: PuntosVenta[]
  tipo: TipoContrato[]
  id: string
  header: string = ""
  idRol: string = ""
  idContrato: string = ""
  idPuntoVenta: string = ""
  loading: boolean = true
  userMessage: string = ""
  errorMessage=""
  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) {
    this.id = this.route.snapshot.paramMap.get("id")

  }
  ngOnInit(): void {
    this.getRoles()
    this.createForm()
  }
  verifyAction(id: string) {
    this.loading = false

    if (id) {
      this.header = "Editar Empleado"
      this.getUser()

    } else {
      this.header = "Registrar Empleado"
      this.createForm()

    }
  }
  getUser() {
    this.usersService.getUsuario(this.id).subscribe(data => {
      //console.log(data);
      this.empleado = data;
      this.createEditForm()
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  createEditForm() {
    this.usuario = new FormGroup({
      'nombre': new FormControl(this.empleado['nombre'], Validators.required),
      'apellido': new FormControl(this.empleado['apellido'], Validators.required),
      'usuario': new FormControl(this.empleado['usuario'], Validators.required),
      'contrasenia': new FormControl(this.empleado['contrasenia']),
      'correo': new FormControl(this.empleado['correo']),
      'fechaFin': new FormControl(this.empleado['fechaFin']),
      'contraseniaR': new FormControl(this.empleado['contrasenia']),
      'idRol': new FormControl(this.findPosIdRol(this.empleado['rol']['id'])),
      'idContrato': new FormControl(this.findPosIdContrato(this.empleado['contrato']['id'])),
      'idPuntoVenta': new FormControl(this.findPosIdPuntoVenta(this.empleado['puntoVenta']['id'])),
    })
  }
  createForm() {
    this.usuario = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'usuario': new FormControl('', Validators.required),
      'contrasenia': new FormControl(''),
      'correo': new FormControl(''),
      'fechaFin': new FormControl(''),
      'contraseniaR': new FormControl(''),
      'idRol': new FormControl(''),
      'idContrato': new FormControl(''),
      'idPuntoVenta': new FormControl(''),

    })
  }
  findPosIdRol(id: number) {
    for (let index = 0; index < this.roles.length; index++) {
      const element = this.roles[index]['id'];
      if (element == id) {
        return index
      }
    }
    return 0
  }
  findPosIdContrato(id: number) {

    for (let index = 0; index < this.tipo.length; index++) {
      const element = this.tipo[index]['id'];
      if (element == id) {
        return index
      }
    }
    return 0
  }
  findPosIdPuntoVenta(id: number) {

    for (let index = 0; index < this.puntos.length; index++) {
      const element = this.puntos[index]['id'];
      if (element == id) {
        return index
      }
    }
    return 0
  }
  getRoles() {
    this.usersService.getRoles().subscribe((data) => {
      this.roles = data
      //console.log(data);
      this.getPuntosVenta()
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  saveRol(event: any) {
    this.idRol = event.target.value
  }
  saveContrato(event: any) {
    this.idContrato = event.target.value
  }
  savePuntoVenta(event: any) {
    this.idPuntoVenta = event.target.value
  }
  getPuntosVenta() {
    this.usersService.getPuntosVenta().subscribe(data => {
      this.puntos = data['content']
      this.getTipoContrato()
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  getTipoContrato() {
    this.usersService.getTipoContrato().subscribe(data => {
      this.tipo = data
      this.verifyAction(this.id)
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  save() {
    //console.log(this.usuario.value);

    if (this.usuario.valid /* && this.idRol !== "" && this.idContrato !== "" && this.idPuntoVenta !== "" */) {
      this.usuario.value['rol'] = this.roles[this.idRol]
      this.usuario.value['contrato'] = this.tipo[this.idContrato]
      this.usuario.value['puntoVenta'] = this.tipo[this.idPuntoVenta]
      //console.log(this.usuario.value);

      if (this.usuario.value['contrasenia'] == this.usuario.value['contraseniaR']) {
        if (this.id) {
          this.usersService.editarUsuario(this.usuario.value, this.id).subscribe(data => {
            //console.log(data);
            this.userMessage = "El Usuario ha sido Actualizado correctamente"
            this.showSuccessMessage("¡Actialización exitosa!")
          }, err=>{
            if (err.status == 401) {
              this.router.navigateByUrl('/login')
            }
          });
        } else {
          this.usersService.crearUsuario(this.usuario.value).subscribe(data => {
            //console.log(data);
            this.userMessage = "El Usuario ha sido creado correctamente"
            this.showSuccessMessage("¡Creación exitosa!")
          }, err=>{
            if (err.status == 401) {
              this.router.navigateByUrl('/login')
            }
          });
        }
      } else {
        //console.log("Contraseñas incorrectas");
      }
    } else {
      this.errorMessage = "Por favor diligencie todos los datos requeridos."
      // this.showErrorMessage();
     
      //this.showErrorMessage();
      //console.log("Ingrese todo los campos");
    }
  }

  showSuccessMessage(mensaje:string) {
    let timerInterval
    Swal.fire({
      title: mensaje,
      html: this.userMessage,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    }).then((result) => {
      /* Read more about handling dismissals below */
      this.router.navigateByUrl('dashboard/trabajadores')
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  showErrorMessage() {
    let timerInterval
    Swal.fire({
      title: 'Información',
      html: 'Por favor ingrese todos los campos',
      icon: 'warning',
      timerProgressBar: true,
    }).then((result) => {
      this.router.navigateByUrl('dashboard/maquinas')
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

}
