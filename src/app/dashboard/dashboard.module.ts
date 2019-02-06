import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/components/common/shared';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    SharedModule,

    DashboardRoutingModule,
  ]
})

export class DashboardModule { }
