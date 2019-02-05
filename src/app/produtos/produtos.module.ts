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

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';

import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';

@NgModule({
  declarations: [ProdutosPesquisaComponent],
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

    ProdutosRoutingModule
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutosModule { }
