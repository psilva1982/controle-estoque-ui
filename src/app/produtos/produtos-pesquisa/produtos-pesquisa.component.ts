import { UnidadeMedidaService } from './../../unidade-medida/unidade-medida.service';
import { LocalService } from 'src/app/local/local.service';
import { Produto } from './../../models/Produto';
import { ProdutoService } from './../produtos.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoFiltro } from '../produtos.service';
import { SubCategoriaService } from 'src/app/subcategorias/subcategoria.service';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css'],
  providers: [
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class ProdutosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new ProdutoFiltro();
  pesquisarPor = [];
  produtos = [];
  medidas = [];
  locais = [];
  subcategorias = [];
  relatorioProdutoURL: string;

  nivelEstoque = [
    { label: 'Estoque normal', value: 'normal'},
    { label: 'Estoque baixo', value: 'baixo'},
    { label: 'Sem estoque', value: 'sem'},
  ];

  @ViewChild('tabela') tabela;

  constructor(

    private subcategoriaService: SubCategoriaService,
    private locaisService: LocalService,
    private unidadeMedidaService: UnidadeMedidaService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,

  ) {
    this.relatorioProdutoURL = `${environment.apiURL}/relatorios/produtos?`;
  }

  ngOnInit() {

    this.pesquisarPor = [
      { label: 'Descrição', value: 'descricao'},
      { label: 'Código', value: 'codigo'},
    ];

    this.carregarSubCategorias();
    this.carregarLocais();
    this.carregarMedidas();
  }

  pesquisar(pagina = 1) {

    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.produtos = dados.results;

        this.gerarRelatorioPDF();
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  excluir(produto: Produto) {

    this.confirmService.confirm({
      message: `Deseja excluir o produto ${produto.descricao}?`,
      accept: () => {

        this.produtoService.excluir(produto.id)
        .subscribe(() => {

          if (this.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.pesquisar(this.filtro.pagina);
          }

          this.messageService.add({ severity: 'warn', summary: 'Excluído', detail: 'Produto excluído'});
        },

        erro => this.errorHandlerService.handle(erro)
        );
      },
    });
  }

  carregarSubCategorias() {
    this.subcategoriaService.listarTodas()
      .subscribe((dados: any) => {
        this.subcategorias = dados.map(subcategoria => ({
          label: `${subcategoria.categoria.nome} - ${subcategoria.nome}`,
          value: subcategoria.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  carregarLocais() {
    this.locaisService.listarTodos()
      .subscribe((dados: any) => {
        this.locais = dados.map(local => ({
          label: local.descricao,
          value: local.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  carregarMedidas() {
    this.unidadeMedidaService.listarTodas()
      .subscribe((dados: any) => {
        this.medidas = dados.map(medida => ({
          label: medida.descricao,
          value: medida.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina + 1);
  }


  statusEstoque(produto) {

    if (produto.estoque === 0) {
      return 'Sem estoque';

    } else if (produto.estoque < produto.minimo) {
      return 'Baixo';

    } else {
      return 'Normal';
    }
  }

  gerarRelatorioPDF() {

    if (this.filtro.estoque) {
      this.relatorioProdutoURL = `${this.relatorioProdutoURL}estoque=${this.filtro.estoque}&`;
    }

    if (this.filtro.local) {
      this.relatorioProdutoURL = `${this.relatorioProdutoURL}local=${this.filtro.local}&`;
    }

    if (this.filtro.medida) {
      this.relatorioProdutoURL = `${this.relatorioProdutoURL}medida=${this.filtro.medida}&`;
    }

    if (this.filtro.subcategoria) {
      this.relatorioProdutoURL = `${this.relatorioProdutoURL}subcategoria=${this.filtro.subcategoria}&`;
    }

    if (this.filtro.valor) {
      this.relatorioProdutoURL = `${this.relatorioProdutoURL}descricao=${this.filtro.valor}&`;
    }
  }

  abrirRelatorio() {
    window.open(this.relatorioProdutoURL);
  }
}
