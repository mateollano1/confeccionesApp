import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Provider } from '../../../../models/provider';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent implements OnInit {

  id:string;
  loading: boolean = true;
  header:string="";
  provider:Provider;
  proveedorForm:FormGroup;
  providerMessage:string;
  errorMessage=""
  constructor(private providersService: ProvidersService,
    private route: ActivatedRoute,
    private router: Router) { 
    this.id = this.route.snapshot.paramMap.get("id")

  }

  ngOnInit(): void {
    this.verifyAction(this.id);
    
  }

  createForm() {
    this.loading = false;
    this.proveedorForm = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'nit': new FormControl('', Validators.required),
      'ubicacion': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required)
    })
  }
  verifyAction(id: string) {

    if (id) {
      this.header = "Editar Proveedor"
      this.getProvider();

    } else {
      this.header = "Registrar Proveedor"
      this.createForm()

    }
  }
  getProvider() {
    this.providersService.getProveedor(this.id).subscribe(data => {
     // console.log(data);
      this.provider = data;
      this.createEditForm()
    }, err=>{
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  createEditForm() {
    this.loading = false;
    this.proveedorForm = new FormGroup({
      'nombre': new FormControl(this.provider['nombre'], Validators.required),
      'nit': new FormControl(this.provider['nit'], Validators.required),
      'ubicacion': new FormControl(this.provider['ubicacion'], Validators.required),
      'telefono': new FormControl(this.provider['telefono'], Validators.required),
      })
  }

  
  save(){
    //console.log(this,this.proveedorForm.value)
    if (this.proveedorForm.valid){
      if (this.id) {
        this.providersService.editarProveedor(this.proveedorForm.value, this.id).subscribe(data => {
          //console.log(data);
          this.providerMessage = "El proveedor ha sido actualizado correctamente"
          this.showSuccessMessage("¡Actualización exitosa!")
        }, err=>{
          if (err.status == 401) {
            this.router.navigateByUrl('/login')
          }
        });
      } else {
        this.providersService.crearProvider(this.proveedorForm.value).subscribe(data => {
          //console.log(data);
          this.providerMessage = "El proveedor ha sido creado correctamente"
          this.showSuccessMessage("¡Creación exitosa!")
        }, err=>{
          if (err.status == 401) {
            this.router.navigateByUrl('/login')
          }
        });
      }
    } else {
      this.errorMessage = "Por favor diligencie todos los datos requeridos."

      //this.showErrorMessage();
     // console.log("Ingrese todo los campos");
    }
    
  }
  showSuccessMessage(mensaje:string) {
    let timerInterval
    Swal.fire({
      title: mensaje,
      html: this.providerMessage,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    }).then((result) => {
      /* Read more about handling dismissals below */
      this.router.navigateByUrl('dashboard/proveedores')
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
