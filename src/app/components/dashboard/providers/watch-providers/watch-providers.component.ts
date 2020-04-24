import { Component, OnInit } from '@angular/core';
import { Provider } from '../../../../models/provider';
import { ProvidersService } from '../../../../services/providers.service';
import { log } from 'util';
import Swal from 'sweetalert2';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.css']
})
export class WatchProvidersComponent implements OnInit {

  loading: boolean = true;
  provs: Provider[]
  
  constructor(private providerService: ProvidersService,private router:Router) { }
  
  ngOnInit(): void {
    this.getProviders()
  }

  getProviders(){
    this.providerService.getProviders().subscribe(data =>{
      //console.log(data);
      this.provs=data['content'];
      this.loading = false; 
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  delete(id:number, index:number){

    Swal.fire({
      title: '¿Está seguro que desea eliminar el proveedor?',
      text: "La información se perderá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.providerService.deleteProvider(id).subscribe(data => {
          this.provs.splice(index,1)
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
