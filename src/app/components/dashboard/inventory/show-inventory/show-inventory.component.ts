import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../services/inventory.service';
import * as CryptoJS from 'crypto-js';
import { Maquina } from '../../../../models/machine';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-show-inventory',
  templateUrl: './show-inventory.component.html',
  styleUrls: ['./show-inventory.component.css']
})
export class ShowInventoryComponent implements OnInit {
idPuntoVenta: string = ""
decPassword: String = "web"
idUser: string = ""
maquinas: Maquina [] 
  constructor(private inventoryService: InventoryService,
    private userService: UsersService,) {
    this.idPuntoVenta = CryptoJS.AES.decrypt(localStorage.getItem('punto_venta').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    this.idUser = CryptoJS.AES.decrypt(localStorage.getItem('id').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
   }

  ngOnInit(): void {
    this.inventoryService.obtenerInventario(this.idPuntoVenta).subscribe((data: any) =>{
      this.maquinas = data
      console.log(this.maquinas)
    })
    // this.inventoryService.obtenerCompras(this.idPuntoVenta).subscribe(data =>{
    //   console.log(data);
      
    // })
  }
  venderMaquina(id,precio:any, cantidad:any){
    this.userService.getUsuario(this.idUser).subscribe(data =>{
      console.log(data);
      
      let venta = {
        "empleado": data,
        "maquina": this.maquinas[id],
        "precio": parseInt(precio.value),
        "cantidad": parseInt(cantidad.value)
      }
      this.inventoryService.venderMaquina(venta).subscribe(data =>{
        console.log(data);
        this.maquinas[id]['cantidad'] = this.maquinas[id]['cantidad'] - parseInt(cantidad.value)
        
      })

    })
  }

}
