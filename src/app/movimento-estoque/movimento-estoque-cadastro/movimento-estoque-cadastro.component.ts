import { ProdutoService } from './../../produtos/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Movimento } from './../../models/Movimento';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-movimento-estoque-cadastro',
  templateUrl: './movimento-estoque-cadastro.component.html',
  styleUrls: ['./movimento-estoque-cadastro.component.css'],
  providers: [
    ErrorHandlerService,
  ]
})
export class MovimentoEstoqueCadastroComponent implements OnInit {

  cabecalho: string;
  entrada: boolean;
  qtdeLabel = 'Quantidade';
  qtdeDisponivel = 0;
  qtdeMaxima = 0;

  @ViewChild('quantidade') quantidadeInput;

  tiposMovimento = [
    { label: 'ENTRADA', value: 'entrada' },
    { label: 'SAÍDA', value: 'saida' }
  ];

  movimento = new Movimento();
  produtos = [];

  constructor(

    private produtoService: ProdutoService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.capturaURL();
    this.carregarProdutos();

  }

  movimentoEntrada() {
    this.cabecalho = 'Entrada de produto no estoque';
    this.movimento.tipo = 'entrada';
    this.entrada = true;
    this.qtdeLabel = 'Quantidade';
    this.qtdeMaxima = 100000;

  }

  movimentoSaida() {
    this.cabecalho = 'Saída de produto do estoque';
    this.movimento.tipo = 'saida';
    this.movimento.quantidade = 0;
    this.entrada = false;
    this.qtdeLabel = `Itens em estoque: ${this.qtdeDisponivel}`;
    this.qtdeMaxima = this.qtdeDisponivel;
  }

  capturaURL() {

    if (this.route.snapshot.routeConfig.path === 'movimentos/entrada') {
      this.movimentoEntrada();

    } else if (this.route.snapshot.routeConfig.path === 'movimentos/saida') {
      this.movimentoSaida();
    }
  }

  mudaMovimento(event) {

    if (event.value === 'entrada') {
      this.movimentoEntrada();

    } else if (event.value === 'saida') {
      this.movimentoSaida();
    }
  }

  carregarProdutos() {
    this.produtoService.listarTodos()
      .subscribe((dados: any) => {
        this.produtos = dados.results.map(produto => ({
          label: `${produto.codigo} - ${produto.descricao}`,
          value: {
            id: produto.id,
            estoque: produto.estoque
          }
        }));

      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoSelecionarProduto(event) {
    this.qtdeDisponivel = event.value.estoque;
    if (!this.entrada) {
      this.qtdeLabel = `Itens em estoque: ${this.qtdeDisponivel}`;
      this.qtdeMaxima = this.qtdeDisponivel;
    }
  }
}
