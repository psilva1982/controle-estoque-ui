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

import { SubcategoriasPesquisaComponent } from './subcategorias-pesquisa/subcategorias-pesquisa.component';
import { SubCategoriasRoutingModule } from './subcategorias-routing.module';
import { SubCategoriaService } from './subcategoria.service';
import { SubcategoriasCadastroComponent } from './subcategorias-cadastro/subcategorias-cadastro.component';

@NgModule({
  declarations: [SubcategoriasPesquisaComponent, SubcategoriasCadastroComponent],
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

    SubCategoriasRoutingModule
  ],
  providers: [
    SubCategoriaService
  ]
})
export class SubcategoriasModule { }
