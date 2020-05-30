import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css']
})
export class ShowInventoryComponent implements OnInit {
idPuntoVenta: string = ""
decPassword: String = "web"

  constructor(private inventoryService: InventoryService) {
    this.idPuntoVenta = CryptoJS.AES.decrypt(localStorage.getItem('punto_venta').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
   }

  ngOnInit(): void {
    this.inventoryService.obtenerInventario(this.idPuntoVenta).subscribe(data =>{
      console.log(data)
    })
  }

}
