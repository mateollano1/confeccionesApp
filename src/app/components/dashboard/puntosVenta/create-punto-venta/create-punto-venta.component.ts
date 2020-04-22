import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { log } from 'util';
import { SellerPointService } from '../../../../services/seller-point.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PuntosVenta } from '../../../../models/puntoVenta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-punto-venta',
  templateUrl: './create-punto-venta.component.html',
  styleUrls: ['./create-punto-venta.component.css']
})
export class CreatePuntoVentaComponent implements OnInit {
  loading: boolean = true
  puntos: FormGroup
  id: string = ""
  header: string = ""
  punto: any
  userMessage: string = ""
  errorMessage = ""

  constructor(private puntoService: SellerPointService,
    private route: ActivatedRoute,
    private router: Router ) {
    this.id = this.route.snapshot.paramMap.get("id")
    if (this.id) {
      this.header = "Editar Punto de Venta"
      this.getPuntoVenta()

    } else {
      this.header = "Crear Punto de Venta"
      this.loading = false
      this.createForm()
    }
  }

  ngOnInit(): void {
  }
  getPuntoVenta() {
    this.puntoService.getPuntoVenta(this.id).subscribe(data => {
      this.punto = data
      // console.log(this.punto);
      this.loadForm()
      this.loading = false
    })
  }
  loadForm() {
    this.puntos = new FormGroup({
      'nombre': new FormControl(this.punto.nombre, Validators.required),
      'detalle': new FormControl(this.punto.detalle, Validators.required),
      'direccion': new FormControl(this.punto.direccion, Validators.required),
      'telefono': new FormControl(this.punto.telefono),
    })
  }
  createForm() {
    this.puntos = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'detalle': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'telefono': new FormControl('',Validators.required),
    })
  }
  save() {
    // console.log(this.puntos.value);
    if (this.puntos.valid) {

      if (this.id) {
        this.puntoService.editarPuntoVenta(this.puntos.value, this.id).subscribe(data => {
          this.userMessage = "El punto de venta ha sido actualizado correctamente"
          this.showSuccessMessage("¡Actualización exitosa!")
        })
      } else {
        this.puntoService.crearPuntoVenta(this.puntos.value).subscribe(data => {
          this.userMessage = "El punto de venta ha sido creado correctamente"
          this.showSuccessMessage("Creación exitosa!")
        })
      }
    }else{
      this.errorMessage = "Por favor diligencie todos los datos requeridos."
    }
  }

  showSuccessMessage(header: string) {
    let timerInterval
    Swal.fire({
      title: header,
      html: this.userMessage,
      icon: 'success',
      timer: 1500,
      timerProgressBar: true,
    }).then((result) => {
      /* Read more about handling dismissals below */
      this.router.navigateByUrl('dashboard/puntos-de-venta')
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

}
