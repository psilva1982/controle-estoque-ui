import { ProdutoService } from './produtos.service';
import { ProdutosRoutingModule } from './produtos-routing.module';
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

import { SharedModule } from '../shared/shared.module';

import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';

@NgModule({
  declarations: [ProdutosPesquisaComponent, ProdutosCadastroComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,

    InputTextModule,
    TableModule,
    CalendarModule,
    CurrencyMaskModule,
    ConfirmDialogModule,
    SelectButtonModule,
    DropdownModule,
    InputTextareaModule,
    TooltipModule,
    InputMaskModule,

    ProdutosRoutingModule
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutosModule { }
