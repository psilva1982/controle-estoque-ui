import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovimentoEstoquePesquisaComponent } from './movimento-estoque-pesquisa/movimento-estoque-pesquisa.component';
import { MovimentoEstoqueCadastroComponent } from './movimento-estoque-cadastro/movimento-estoque-cadastro.component';


const rotas: Routes = [
  { path: 'movimentos', component: MovimentoEstoquePesquisaComponent },
  { path: 'movimentos/entrada', component: MovimentoEstoqueCadastroComponent },
  { path: 'movimentos/saida', component: MovimentoEstoqueCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(rotas),
  ],
  exports: [
    RouterModule,
  ],
})
export class MovimentoEstoqueRoutingModule { }
