import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const rotas: Routes = [
  { path: 'dashboard', component: DashboardHomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ],
  exports: [
    RouterModule,
  ],
})
export class DashboardRoutingModule { }
