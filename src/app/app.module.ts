import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowInventoryComponent } from './components/dashboard/inventory/show-inventory/show-inventory.component';
import { CreateMachineComponent } from './components/dashboard/machine/create-machine/create-machine.component';
import { ShowMachineComponent } from './components/dashboard/machine/show-machine/show-machine.component';
import { WatchUsersComponent } from './components/dashboard/users/watch-users/watch-users.component';
import { CreateUserComponent } from './components/dashboard/users/create-user/create-user.component';
import { WatchUserComponent } from './components/dashboard/users/user/watch-user/watch-user.component';
import { WatchProvidersComponent } from './components/dashboard/providers/watch-providers/watch-providers.component';
import { CreateProviderComponent } from './components/dashboard/providers/create-provider/create-provider.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PuntosVentaComponent } from './components/dashboard/puntosVenta/puntos-venta/puntos-venta.component';
import { CreatePuntoVentaComponent } from './components/dashboard/puntosVenta/create-punto-venta/create-punto-venta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ShowInventoryComponent,
    CreateMachineComponent,
    ShowMachineComponent,
    WatchUsersComponent,
    CreateUserComponent,
    WatchUserComponent,
    WatchProvidersComponent,
    CreateProviderComponent,
    PuntosVentaComponent,
    CreatePuntoVentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
