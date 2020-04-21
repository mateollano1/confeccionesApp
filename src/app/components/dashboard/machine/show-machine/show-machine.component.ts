import { Component, OnInit } from '@angular/core';
import { Maquina } from '../../../../models/machine';
import { MachinesService } from '../../../../services/machines.service';

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

}
