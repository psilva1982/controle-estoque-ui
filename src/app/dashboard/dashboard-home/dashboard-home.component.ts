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

  @ViewChild('graficoBarra') graficoBarra: UIChart;
  barraGrafico: any;
  entradas = [];
  saidas = [];

  @ViewChild('graficoPizza') graficoPizza: UIChart;
  pizzaGrafico: any;
  pizzaLabel = [];
  pizzaDados = [];

  constructor(
    private dashboardService: DashboardService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.recuperarDados();
    this.geraGraficoBarra();
    this.geraGraficoPizza();

   setTimeout(function () {
      this.graficoPizza.refresh();
      this.graficoBarra.refresh();

    }.bind(this), 1);
  }

  geraGraficoBarra() {
    this.barraGrafico = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: 'Entrada',
          data: this.entradas
        },
        {
          label: 'Saída',
          data: this.saidas
        }
      ]
    }
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

        for (const i of dados.entradas) {
          this.entradas.push(dados.entradas[i]);
        }

        for (const i of dados.saidas) {
          this.saidas.push(dados.saidas[i]);
        }

        // tslint:disable-next-line:forin
        for (const i in this.produtosCategorias) {
          this.pizzaLabel.push(i);
          this.pizzaDados.push(this.produtosCategorias[i]);
        }
      },
        erro => this.errorHandlerService.handle(erro)
      );
  }
}
