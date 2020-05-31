import { Component, OnInit, Provider } from '@angular/core';
import { MachinesService } from '../../../../../services/machines.service';
import { Router } from '@angular/router';
import { Maquina } from '../../../../../models/machine';
import { InventoryService } from '../../../../../services/inventory.service';
import { UsersService } from '../../../../../services/users.service';
import * as CryptoJS from 'crypto-js';
import { User } from 'src/app/models/user';
import { empleado } from '../../../../../models/empleado';
import { ProvidersService } from '../../../../../services/providers.service';
import { log } from 'util';


@Component({
  selector: 'app-buy-items',
  templateUrl: './buy-items.component.html',
  styleUrls: ['./buy-items.component.css']
})
export class BuyItemsComponent implements OnInit {
  contador: number = 1
  idUser: string = ""
  decPassword: String = "web"
  proveedores: Provider[] = []
  provider: string = ""
  compra: any
  constructor(private machineService: MachinesService,
    private router: Router,
    private inventoryService: InventoryService,
    private userService: UsersService,
    private providerService: ProvidersService) {
    this.idUser = CryptoJS.AES.decrypt(localStorage.getItem('id').trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

  }
  maquinas: Maquina[];
  user: empleado
  loading: boolean = true
  ngOnInit(): void {
    this.getMaquinas();
    this.providerService.getProviders().subscribe(data => {
      this.proveedores = data['content']
    })
  }
  getMaquinas() {
    this.machineService.obtenerMaquinas().subscribe(data => {
      this.maquinas = data['content'];
      console.log("Maquinas", this.maquinas)
      this.loading = false;

    }, err => {
      if (err.status == 401) {
        this.router.navigateByUrl('/login')
      }
    });
  }
  add(cont: any) {
    return parseInt(cont.value) + 1
  }
  sub(cont: any) {
    let val = parseInt(cont.value) - 1
    if (val<0) {
      return 0 
    }
    return val
  }
  save(i, cont: any, price: any) {
    let numeroMaquinas = cont.value
    let precioMaquina = price.value
    if (numeroMaquinas > 0 && precioMaquina >0 && this.provider !== "") {
   
    this.userService.getUsuario(this.idUser).subscribe(data => {
      this.user = data
       this.compra = {
        "empleado": this.user,
        "maquina": this.maquinas[i],
        "precio": parseInt(precioMaquina),
        "cantidad": parseInt(numeroMaquinas),
        "reciboCompra": "",
        "fechaCompra": new Date(),
        "idProvedor": this.proveedores[this.provider],
        "total": ""
      }
      console.log(JSON.stringify(this.compra));
      
      this.inventoryService.comprarMaquina(this.compra).subscribe(data =>{
        console.log(data);
      })
    })
    // this.inventoryService.comprarMaquina()
  }
}
  saveProvider(event: any) {
    this.provider = event.target.value
  }
}
