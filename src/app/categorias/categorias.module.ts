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

import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasCadastroComponent } from './categorias-cadastro/categorias-cadastro.component';

import { CategoriaService } from './categoria.service';
import { CategoriasRoutingModule } from './categorias-routing.module';

@NgModule({
  declarations: [CategoriasPesquisaComponent, CategoriasCadastroComponent],
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

    CategoriasRoutingModule
  ],
  providers: [
    CategoriaService
  ]
})
export class CategoriasModule { }
