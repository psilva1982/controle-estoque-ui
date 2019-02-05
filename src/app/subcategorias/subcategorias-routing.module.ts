import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubcategoriasPesquisaComponent } from './subcategorias-pesquisa/subcategorias-pesquisa.component';
import { SubcategoriasCadastroComponent } from './subcategorias-cadastro/subcategorias-cadastro.component';

const rotas: Routes = [
  { path: 'subcategorias', component: SubcategoriasPesquisaComponent },
  { path: 'subcategorias/nova', component: SubcategoriasCadastroComponent },
  { path: 'subcategorias/:id', component: SubcategoriasCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ],
  exports: [
    RouterModule,
  ],
})
export class SubCategoriasRoutingModule { }