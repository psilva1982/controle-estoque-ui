import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CategoriasPesquisaComponent } from './categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasCadastroComponent } from './categorias-cadastro/categorias-cadastro.component';

const rotas: Routes = [
  { path: 'categorias', component: CategoriasPesquisaComponent },
  { path: 'categorias/nova', component: CategoriasCadastroComponent },
  { path: 'categorias/:id', component: CategoriasCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ],
  exports: [
    RouterModule,
  ],
})
export class CategoriasRoutingModule { }
