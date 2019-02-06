import { NgModule } from '@angular/core';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuEsquerdoComponent } from './menu-esquerdo/menu-esquerdo.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import {TooltipModule} from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CabecalhoComponent,
    MenuEsquerdoComponent,
    RodapeComponent,
    PaginaNaoEncontradaComponent,
    PaginaLoginComponent
  ],

  imports: [
    SharedModule,
    TooltipModule
  ],

  exports: [
    CabecalhoComponent,
    MenuEsquerdoComponent,
    RodapeComponent,
    PaginaNaoEncontradaComponent
  ]
})
export class AtacamaLayoutModule { }
