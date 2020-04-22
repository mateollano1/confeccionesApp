import { Component, OnInit } from '@angular/core';
import { SellerPointService } from '../../../../services/seller-point.service';
import { PuntosVenta } from '../../../../models/puntoVenta';

@Component({
  selector: 'app-puntos-venta',
  templateUrl: './puntos-venta.component.html',
  styleUrls: ['./puntos-venta.component.css']
})
export class PuntosVentaComponent implements OnInit {

  constructor(private puntosVentaService: SellerPointService) { }
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
  delete(i: number){
    console.log(i);
    this.puntosVentaService.deletePuntoVenta(i).subscribe(data =>{
      
      // console.log(data);
      
    })
  }

}
