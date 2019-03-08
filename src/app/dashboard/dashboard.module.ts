import { NgModule } from '@angular/core';
import { SharedModule } from 'primeng/components/common/shared';
import {ChartModule} from 'primeng/chart';
import {MessagesModule} from 'primeng/messages';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './dashboard.service';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    SharedModule,
    ChartModule,
    MessagesModule,

    DashboardRoutingModule,
  ],
  providers: [
    DashboardService
  ]
})

export class DashboardModule { }
