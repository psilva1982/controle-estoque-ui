import { ProdutosModule } from './produtos/produtos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { AppComponent } from './app.component';
import { AtacamaLayoutModule } from './atacama-layout/atacama-layout.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { SubcategoriasModule } from './subcategorias/subcategorias.module';

registerLocaleData(localePt, 'pt', localePtExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SegurancaModule,
    AtacamaLayoutModule,

    CategoriasModule,
    SubcategoriasModule,
    ProdutosModule,

    AppRoutingModule,
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) { }
}
