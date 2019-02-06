import { LocalService } from './local.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers: [
    LocalService
  ]
})
export class LocalModule { }
