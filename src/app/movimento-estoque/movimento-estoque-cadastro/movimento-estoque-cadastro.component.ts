import { ProdutoService } from './../../produtos/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';


import { Movimento } from './../../models/Movimento';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MovimentoEstoqueService } from '../movimento-estoque.service';
import { AuthService } from 'src/app/seguranca/auth.service';

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
  entrada = false;
  qtdeLabel = 'Quantidade';
  qtdeDisponivel = 0;
  qtdeMaxima = 0;
  produtoSelecionado;
  produtoSelecionadoPlaceHolder: string;
  dataMovimento: Date;
  locale: any;

  tiposMovimento = [
    { label: 'ENTRADA', value: 'entrada' },
    { label: 'SAÍDA', value: 'saida' }
  ];

  movimento = new Movimento();
  produtos = [];

  constructor(

    private messageService: MessageService,
    private produtoService: ProdutoService,
    private movimentoService: MovimentoEstoqueService,
    private errorHandlerService: ErrorHandlerService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

    this.locale = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
      monthNames: [ 'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: '/dd/mm/yy'
  };

    this.preparaEdicao();
    this.carregarProdutos();

  }

  movimentoEntrada() {
    this.cabecalho = 'Entrada de produto no estoque';
    this.movimento.tipo_movimento = 'entrada';
    this.entrada = true;
    this.qtdeLabel = 'Quantidade';
    this.qtdeMaxima = 100000;

  }

  movimentoSaida() {
    this.cabecalho = 'Saída de produto do estoque';
    this.movimento.tipo_movimento = 'saida';
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
        this.produtos = dados.map(produto => ({
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
    this.movimento.produto = this.produtoSelecionado.id;

    if (!this.entrada) {
      this.qtdeLabel = `Itens em estoque: ${this.qtdeDisponivel}`;
      this.qtdeMaxima = this.qtdeDisponivel;
    }
  }

  salvar(form: FormControl) {
    if (this.movimento.id) {
      this.atualizaExistente();

    } else {
      this.salvaNovo(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    // Bug perca do valor padrão do selectbutton
    setTimeout(function () {
      this.movimento = new Movimento();
    }.bind(this), 1);

    this.router.navigate(['/movimentos/saida']);
  }

  salvaNovo(form: FormControl) {

    this.movimento.data = moment(this.dataMovimento).format('YYYY-MM-DD');
    this.movimento.usuario = this.auth.jwtPayload.user_id;

    this.movimentoService.adicionar(this.movimento)
      .subscribe((dados: any) => {

        this.messageService.add({ severity: 'success', summary: 'Movimento', detail: `Registrado com sucesso` });
        this.router.navigate(['/movimentos']);
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  preparaEdicao() {
    if (this.route.snapshot.params.id) {

      const id = this.route.snapshot.params.id;
      this.cabecalho = 'Detalhe de movimento';

      this.movimentoService.buscarPorId(id)
        .subscribe((dados: any) => {

          this.movimento = dados;
          this.dataMovimento =  moment(dados.data, 'YYYY-MM-DD').toDate();
          this.produtoSelecionadoPlaceHolder = `${dados.produto.codigo} - ${dados.produto.descricao}`;
        },

          erro => this.errorHandlerService.handle(erro)
        );
    } else {
      this.capturaURL();
    }
  }

  atualizaExistente() {
    this.movimentoService.atualizar(this.movimento)
      .subscribe((dados: any) => {
        this.messageService.add({ severity: 'success', summary: 'Movimento', detail: `Movimento atualizada` });
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }
}
