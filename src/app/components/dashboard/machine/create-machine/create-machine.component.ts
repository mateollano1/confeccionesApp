import { Component, OnInit } from '@angular/core';
import { Maquina } from '../../../../models/machine';
import { MachinesService } from '../../../../services/machines.service';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  maquina:Maquina;

  constructor(private machineService:MachinesService) { }

  ngOnInit(): void {

    this.machineService.obtenerMaquinas().subscribe(data =>{
      console.log("Maquinas",data['content'])
    });
  }



}
