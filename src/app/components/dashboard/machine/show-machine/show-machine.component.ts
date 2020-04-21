import { Component, OnInit } from '@angular/core';
import { Maquina } from '../../../../models/machine';
import { MachinesService } from '../../../../services/machines.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-machine',
  templateUrl: './show-machine.component.html',
  styleUrls: ['./show-machine.component.css']
})
export class ShowMachineComponent implements OnInit {

  maquinas:  Maquina [];
  loading: boolean = true

  constructor(private machineService:MachinesService) { }


  ngOnInit(): void {
    this.getMaquinas();
  }

  getMaquinas(){
    this.machineService.obtenerMaquinas().subscribe(data =>{
      this.maquinas=data['content'];
      console.log("Maquinas",this.maquinas)
      this.loading=false;

    });
  }

  delete(id: number, index: number) {
    Swal.fire({
      title: '¿Está seguro que desea eliminar la maquina?',
      text: "La información se perderá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.machineService.borrarMaquina(id).subscribe(data => {
          this.maquinas.splice(index,1)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })

      }
    });
    console.log("index",index)
    console.log("id",id);
  }
  
}
