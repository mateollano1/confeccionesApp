import { Component, OnInit } from '@angular/core';
import { Maquina } from '../../../../models/machine';
import { MachinesService } from '../../../../services/machines.service';
import { Form, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  fecha;
  icon:string;
  activar:boolean=false;
  machineMessage:string="";
  errorMessage=""
  constructor(private machineService:MachinesService,private router: Router, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get("id")
    
  }

  ngOnInit(): void {
    this.verifyAction(this.id);
  }

  getMaquina(){
    this.machineService.obtenerMaquina(this.id).subscribe( data=>{
      this.maquina=data;
      this.createEditForm();
      this.maquinaForm.controls['fechaCreacion'].disable();
      //console.log("Maquina id",this.maquina);
      }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }

  createForm(){
    this.loading = false
    this.maquinaForm = new FormGroup({
      'marca': new FormControl('', Validators.required),
      'modelo': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required), 
    })
  }

  createEditForm() {
    this.loading=false;
    this.maquinaForm = new FormGroup({
      'marca': new FormControl(this.maquina['marca'], Validators.required),
      'modelo': new FormControl(this.maquina['modelo'], Validators.required),
      'tipo': new FormControl(this.maquina['tipo'], Validators.required),
      'fechaCreacion': new FormControl(this.maquina['fechaCreacion']),
//'fechaCreacion': new FormControl([{value: this.maquina['fechaCreacion'], disabled: true}, Validators.required]),
    })
  }

  verifyAction(id: string) {
    if (id) {
      this.header = "Editar Maquina"
      this.activar=true;
      this.getMaquina();

    } else {
      this.header = "Registrar Maquina"
      this.createForm();
    }
  }
  save(){
   
    if (this.maquinaForm.valid){
      if (this.id) {
        this.machineService.editarMaquina(this.maquinaForm.value,this.id).subscribe(data =>{
          //console.log(data);
            this.machineMessage = "La maquina ha sido actualizada correctamente"
            this.showSuccessMessage("¡Actualización exitosa!")
          }, err=>{
            if (err.status == 401) {
              this.router.navigateByUrl('/login')
            }
          });
         //console.log("Editar")
        } else {
          this.machineService.crearMaquina(this.maquinaForm.value).subscribe(data => {
            //console.log(data);
            this.machineMessage = "Maquina creada exitosamente"
            this.showSuccessMessage("¡Creación exitosa!");
          }, err=>{
            if (err.status == 401) {
              this.router.navigateByUrl('/login')
            }
          });
        }
      }else{
        this.errorMessage = "Por favor diligencie todos los datos requeridos."

        //this.showErrorMessage();
      }


  }

  showSuccessMessage(mensaje:string) {
    let timerInterval
    Swal.fire({
      title: mensaje,
      html: this.machineMessage,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    }).then((result) => {
      this.router.navigateByUrl('dashboard/maquinas')
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
