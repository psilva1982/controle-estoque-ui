import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './atacama-layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PaginaLoginComponent } from './atacama-layout/pagina-login/pagina-login.component';

const rotas: Routes = [
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },

  { path: 'login', component: PaginaLoginComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(rotas)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
