import { Component, OnInit } from '@angular/core';
import { SellerPointService } from '../../../../services/seller-point.service';
import { PuntosVenta } from '../../../../models/puntoVenta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-puntos-venta',
  templateUrl: './puntos-venta.component.html',
  styleUrls: ['./puntos-venta.component.css']
})
export class PuntosVentaComponent implements OnInit {

  constructor(private puntosVentaService: SellerPointService) { 
    
  }
  puntos: PuntosVenta []
  loading: boolean = true
  ngOnInit(): void {
    this.getPuntosVenta()
  }

  getPuntosVenta(){
    this.puntosVentaService.getPuntosVenta().subscribe(data =>{
      this.puntos = data['content']
      // console.log(this.puntos);
      this.loading = false
      
    })
  }
  delete(i: number, index:number){
    Swal.fire({
      title: '¿Está seguro que desea eliminar el punto de venta?',
      text: "La información se perderá",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.value) {
        this.puntosVentaService.deletePuntoVenta(i).subscribe(data => {
          this.puntos.splice(index,1)
          Swal.fire(
            'Eliminado correctamente',
            '',
            'success'
          )
          console.log(data);
        })

      }
    });
  }

}
