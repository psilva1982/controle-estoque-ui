import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  providers: [
    ErrorHandlerService
  ]
})
export class DashboardHomeComponent implements OnInit {

  ano: string;

  semEstoque: number;

  maiorEstoqueProduto: string;
  maiorEstoqueQtde: number;

  maiorSaidaProduto: string;
  maiorSaidaQtde: number;

  entradaMensal: number;
  saidaMensal: number;

  produtos: number;
  produtosCategorias = {};

  // @ViewChild('graficoBarra') graficoBarra: UIChart;
  barraGrafico: any;

  // @ViewChild('graficoPizza') graficoPizza: UIChart;
  pizzaGrafico: any;
  pizzaLabel = [];
  pizzaDados = [];

  constructor(
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.recuperarDados();
    /*
    setTimeout(function () {

      this.graficoBarra.refresh();
      this.graficoPizza.refresh();

    }.bind(this), 1);
    */
  }

  geraGraficoBarra(entradas, saidas) {
    this.barraGrafico = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Entrada',
          data: entradas,
        },
        {
          label: 'Saída',
          data: saidas,
        }
      ]
    };
  }

  geraGraficoPizza(legenda, dados) {
    this.pizzaGrafico = {
      labels: legenda,
      datasets: [
        {
          data: dados,
        }]
    };
  }

  recuperarDados() {
    this.dashboardService.buscarDados()
      .subscribe((dados: any) => {

        this.ano = dados.ano;

        this.semEstoque = dados.sem_estoque;

        this.maiorEstoqueProduto = dados.maior_estoque_produto;
        this.maiorEstoqueQtde = dados.maior_estoque_qtde;

        this.produtos = dados.total_produtos;
        this.produtosCategorias = dados.produtos_categorias;

        this.entradaMensal = dados.entrada_mensal;
        this.saidaMensal = dados.saida_mensal;

        this.maiorSaidaProduto = dados.maior_saida_produto;
        this.maiorSaidaQtde = dados.maior_saida_qtde;

        // tslint:disable-next-line:forin
        for (const i in this.produtosCategorias) {
          this.pizzaLabel.push(i);
          this.pizzaDados.push(this.produtosCategorias[i]);
        }

        this.geraGraficoPizza(this.pizzaLabel, this.pizzaDados);
        this.geraGraficoBarra(dados.entradas, dados.saidas);
      },
        erro => this.errorHandlerService.handle(erro)
      );
  }
}
