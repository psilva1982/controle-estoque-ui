import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  providers: [
    ErrorHandlerService
  ]
})
export class DashboardHomeComponent implements OnInit {

  semEstoque: number;
  maiorEstoque: number;
  produtos: number;
  produtosCategorias = {};

  constructor(
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.recuperarDados();
  }

  recuperarDados() {
    this.dashboardService.buscarDados()
      .subscribe((dados: any) => {
        this.semEstoque = dados.sem_estoque;
        this.maiorEstoque = dados.maior_estoque;
        this.produtos = dados.total_produtos;
        this.produtosCategorias = dados.produtos_categorias;

        console.log(this.produtosCategorias);
      },
        erro => this.errorHandlerService.handle(erro)
      );
  }
}
