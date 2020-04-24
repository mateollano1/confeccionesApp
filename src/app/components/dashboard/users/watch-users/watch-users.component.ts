import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../../../services/users.service';
import { empleado } from '../../../../models/empleado';
import { Router } from '@angular/router';
@Component({
  selector: 'app-watch-users',
  templateUrl: './watch-users.component.html',
  styleUrls: ['./watch-users.component.css']
})
export class WatchUsersComponent implements OnInit {
  usuario: empleado[]
  loading: boolean = true
  constructor(private usersService: UsersService,private router:Router) {

  }

  ngOnInit(): void {
    this.getEmpleados()
  }
  getEmpleados() {
    this.usersService.getUsuarios().subscribe(data => {
      //console.log(data['content']);
      this.usuario = data['content']
      this.loading = false
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  delete(id: number, index: number) {
    //console.log(id);

    Swal.fire({
      title: '¿Está seguro que desea eliminar el usuario?',
      text: "La información se perderá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUSer(id).subscribe(data => {
          this.usuario.splice(index,1)
          Swal.fire(
            'Eliminado correctamente',
            '',
            'success'
          )
        })

      }
    })
  }
}
