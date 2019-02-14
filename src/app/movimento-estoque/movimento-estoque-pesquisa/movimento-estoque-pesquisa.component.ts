import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, LazyLoadEvent } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { MovimentoFiltro, MovimentoEstoqueService } from '../movimento-estoque.service';
import { Movimento } from 'src/app/models/Movimento';
import { ProdutoService } from 'src/app/produtos/produtos.service';

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
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.movimentoService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.movimentos = dados.results;
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
        this.produtos = dados.results.map(produto => ({
          label: `${produto.codigo} - ${produto.descricao}`,
          value: produto.id
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
