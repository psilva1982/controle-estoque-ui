import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { MovimentoFiltro, MovimentoEstoqueService } from '../movimento-estoque.service';
import { Movimento } from 'src/app/models/Movimento';
import { ProdutoService } from 'src/app/produtos/produtos.service';
import { environment } from 'src/environments/environment';

import * as moment from 'moment';

@Component({
  selector: 'app-movimento-estoque-pesquisa',
  templateUrl: './movimento-estoque-pesquisa.component.html',
  styleUrls: ['./movimento-estoque-pesquisa.component.css'],
  providers: [
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class MovimentoEstoquePesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new MovimentoFiltro();
  movimentos = [];
  produtos = [];
  locale: any;
  relatorioMovimentoUrl: string;

  tiposMovimento = [
    { label: 'Todos', value: 'qualquer' },
    { label: 'Entrada', value: 'entrada' },
    { label: 'Saída', value: 'saida' }
  ];

  @ViewChild('tabela') tabela;

  constructor(
    private movimentoService: MovimentoEstoqueService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.carregarProdutos();
    this.filtro.tipo = 'qualquer';

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

    this.relatorioMovimentoUrl = `${environment.apiURL}/relatorios/movimentos?`;

  }

  pesquisar(pagina = 1) {

    this.filtro.pagina = pagina;

    this.movimentoService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.movimentos = dados.results;

        this.geraRelatorioPDF();
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  excluir(movimento: Movimento) {

    this.confirmService.confirm({
      message: `Deseja excluir o movimento ${movimento.id}?`,
      accept: () => {

        this.movimentoService.excluir(movimento.id)
        .subscribe(() => {

          if (this.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.pesquisar(this.filtro.pagina);
          }

          this.messageService.add({ severity: 'warn', summary: 'Excluído', detail: 'Movimento excluído'});
        },

        erro => this.errorHandlerService.handle(erro)
        );
      },
    });
  }

  carregarProdutos() {
    this.produtoService.listarTodos()
      .subscribe((dados: any) => {
        this.produtos = dados.map(produto => ({
          label: `${produto.codigo} - ${produto.descricao}`,
          value: produto.id
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina + 1);
  }

  geraRelatorioPDF() {

    if (this.filtro.produto) {
      this.relatorioMovimentoUrl = `${this.relatorioMovimentoUrl}produto=${this.filtro.produto}&`;
    }

    if (this.filtro.tipo && this.filtro.tipo !== 'qualquer') {
      this.relatorioMovimentoUrl = `${this.relatorioMovimentoUrl}tipo_movimento=${this.filtro.tipo}&`;
    }

    if (this.filtro.dataDe) {
      const data = moment(this.filtro.dataDe).format('YYYY-MM-DD');
      this.relatorioMovimentoUrl = `${this.relatorioMovimentoUrl}data__gte=${data}&`;
    }

    if (this.filtro.dataAte) {
      const data = moment(this.filtro.dataAte).format('YYYY-MM-DD');
      this.relatorioMovimentoUrl = `${this.relatorioMovimentoUrl}data__lte=${data}&`;
    }
  }

  abrirRelatorio() {
    window.open(this.relatorioMovimentoUrl);
    this.relatorioMovimentoUrl = `${environment.apiURL}/relatorios/movimentos?`;
  }
}
