import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UnidadeMedidaService } from './unidade-medida.service';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers: [
    UnidadeMedidaService,
  ]
})
export class UnidadeMedidaModule { }
