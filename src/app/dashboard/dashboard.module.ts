import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/components/common/shared';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    SharedModule,

    DashboardRoutingModule,
  ],
  providers: [
    DashboardService
  ]
})

export class DashboardModule { }
