import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TooltipModule} from 'primeng/tooltip';
import {InputMaskModule} from 'primeng/inputmask';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from './../shared/shared.module';

import { MovimentoEstoqueCadastroComponent } from './movimento-estoque-cadastro/movimento-estoque-cadastro.component';
import { MovimentoEstoquePesquisaComponent } from './movimento-estoque-pesquisa/movimento-estoque-pesquisa.component';
import { MovimentoEstoqueRoutingModule } from './movimento-estoque-routing.module';
import { MovimentoEstoqueService } from './movimento-estoque.service';

@NgModule({
  declarations: [
    MovimentoEstoqueCadastroComponent,
    MovimentoEstoquePesquisaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,

    InputTextModule,
    TableModule,
    CalendarModule,
    ConfirmDialogModule,
    SelectButtonModule,
    DropdownModule,
    InputTextareaModule,
    InputMaskModule,
    TooltipModule,

    CurrencyMaskModule,

    MovimentoEstoqueRoutingModule
  ], 
  providers: [
    MovimentoEstoqueService
  ]
})
export class MovimentoEstoqueModule { }
