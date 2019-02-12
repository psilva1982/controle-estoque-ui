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

  pizzaGrafico: any;
  pizzaLabel = [];
  pizzaDados = [];

  constructor(
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.recuperarDados();

    setTimeout(function () {
      this.geraGraficoPizza();

    }.bind(this), 5);

  }

  geraGraficoPizza() {
    this.pizzaGrafico = {
      labels: this.pizzaLabel,
      datasets: [
          {
              data: this.pizzaDados,
          }]
      };
  }

  recuperarDados() {
    this.dashboardService.buscarDados()
      .subscribe((dados: any) => {
        this.semEstoque = dados.sem_estoque;
        this.maiorEstoque = dados.maior_estoque;
        this.produtos = dados.total_produtos;
        this.produtosCategorias = dados.produtos_categorias;

        for(let i in this.produtosCategorias) {
          this.pizzaLabel.push(i);
          this.pizzaDados.push(this.produtosCategorias[i]);
        }
      },
        erro => this.errorHandlerService.handle(erro)
      );
  }
}
