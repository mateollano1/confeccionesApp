import { Component, OnInit } from '@angular/core';
import { Maquina } from '../../../../models/machine';
import { MachinesService } from '../../../../services/machines.service';
import { Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  maquinaForm: FormGroup;
  maquina:Maquina;
  loading:boolean=true;
  header:string="";
  id: string;

  constructor(private machineService:MachinesService,private router: Router, private route: ActivatedRoute) { 
    //this.id = this.route.snapshot.paramMap.get("id")
    //Cuando se va editar trae id
    //console.log("idconstructor",this.id)

  }

  ngOnInit(): void {

    this.verifyAction(this.id);

  }
  createForm(){
    this.loading = false
    this.maquinaForm = new FormGroup({
      'marca': new FormControl('', Validators.required),
      'modelo': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required), 
    })

  }
  verifyAction(id: string) {
    this.loading = false

    if (id) {
      this.header = "Editar Maquina"
      //this.getUser()

    } else {
      this.header = "Registrar Maquina"
      this.createForm()

    }
    
  }
  save(){
    console.log("Form Maquina",this.maquinaForm.value);
    if (this.maquinaForm.valid){
      if (this.id) {
         console.log("Editar")
        } else {
          this.machineService.crearMaquina(this.maquinaForm.value).subscribe(data => {
            console.log(data);
          });
        }
      }
  }
}
