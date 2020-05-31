import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { InventoryService } from '../../../../services/inventory.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  idPuntoVenta: string = ""
  decPassword: String = "web"
  transacciones: any []
  ventas: any []
  constructor(private inventoryService: InventoryService, ) {
    this.idPuntoVenta = CryptoJS.AES.decrypt(localStorage.getItem('punto_venta').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

  }

  ngOnInit(): void {
    this.inventoryService.obtenerCompras(this.idPuntoVenta).subscribe(data =>{
      console.log(data);
      this.transacciones = data
      this.inventoryService.obtenerVentas(this.idPuntoVenta).subscribe(data=>{
        console.log(data);
        this.ventas = data
      })
    })
  }

}
