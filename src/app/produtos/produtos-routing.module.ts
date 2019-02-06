import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const rotas: Routes = [
  { path: 'produtos', component: ProdutosPesquisaComponent },
  { path: 'produtos/novo', component: ProdutosCadastroComponent },
  { path: 'produtos/:id', component: ProdutosCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProdutosRoutingModule { }
