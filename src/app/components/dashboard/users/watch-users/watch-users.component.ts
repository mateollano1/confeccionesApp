import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../../../services/users.service';
import { empleado } from '../../../../models/empleado';
@Component({
  selector: 'app-watch-users',
  templateUrl: './watch-users.component.html',
  styleUrls: ['./watch-users.component.css']
})
export class WatchUsersComponent implements OnInit {
  usuario: empleado[]
  loading: boolean = true
  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.getEmpleados()
  }
  getEmpleados() {
    this.usersService.getUsuarios().subscribe(data => {
      console.log(data['content']);
      this.usuario = data['content']
      this.loading = false

    })
  }
  delete(id: number, index: number) {
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUSer(id).subscribe(data => {
          this.usuario.splice(index,1)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })

      }
    })
  }
}
