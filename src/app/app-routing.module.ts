import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [

{path:'login', component:LoginComponent},
{path:'dashboard', component:DashboardComponent},
{path:'**', redirectTo: '/login', pathMatch:'full'},
{path:'**', component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
