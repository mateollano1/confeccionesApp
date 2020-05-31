import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShowInventoryComponent } from './components/dashboard/inventory/show-inventory/show-inventory.component';
import { ShowMachineComponent } from './components/dashboard/machine/show-machine/show-machine.component';
import { CreateMachineComponent } from './components/dashboard/machine/create-machine/create-machine.component';
import { WatchProvidersComponent } from './components/dashboard/providers/watch-providers/watch-providers.component';
import { CreateProviderComponent } from './components/dashboard/providers/create-provider/create-provider.component';
import { WatchUsersComponent } from './components/dashboard/users/watch-users/watch-users.component';
import { CreateUserComponent } from './components/dashboard/users/create-user/create-user.component';
import { PuntosVentaComponent } from './components/dashboard/puntosVenta/puntos-venta/puntos-venta.component';
import { CreatePuntoVentaComponent } from './components/dashboard/puntosVenta/create-punto-venta/create-punto-venta.component';
import { BuyItemsComponent } from './components/dashboard/inventory/buyItems/buy-items/buy-items.component';
import { TransactionsComponent } from './components/dashboard/inventory/transactions/transactions.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'inventario', component: ShowInventoryComponent },
      { path: 'maquinas', component: ShowMachineComponent },
      { path: 'crear/maquina', component: CreateMachineComponent },
      { path: 'editar/maquina/:id', component: CreateMachineComponent },
      { path: 'proveedores', component: WatchProvidersComponent },
      { path: 'crear/proveedor', component: CreateProviderComponent },
      { path: 'editar/proveedor/:id', component: CreateProviderComponent },
      { path: 'trabajadores', component: WatchUsersComponent },
      { path: 'crear/trabajador', component: CreateUserComponent },
      { path: 'editar/trabajador/:id', component: CreateUserComponent },
      { path: 'puntos-de-venta', component: PuntosVentaComponent },
      { path: 'crear/puntos-de-venta', component: CreatePuntoVentaComponent },
      { path: 'editar/puntos-de-venta/:id', component: CreatePuntoVentaComponent },
      { path: 'compras', component: BuyItemsComponent },
      { path: 'transacciones', component: TransactionsComponent },


    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
