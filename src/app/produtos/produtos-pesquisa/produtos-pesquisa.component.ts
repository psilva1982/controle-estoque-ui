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

  @ViewChild('tabela') tabela;

  constructor(

    private subcategoriaService: SubCategoriaService,
    private locaisService: LocalService,
    private unidadeMedidaService: UnidadeMedidaService,
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,

  ) { }

  ngOnInit() {

    this.pesquisarPor = [
      { label: 'Descrição', value: 'descricao'},
      { label: 'Código', value: 'codigo'},
    ];

    this.carregarSubCategorias();
    this.carregarLocais();
    this.carregarMedidas();
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.produtoService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.produtos = dados.results;
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
        this.subcategorias = dados.results.map(subcategoria => ({
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
        this.locais = dados.results.map(local => ({
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
        this.medidas = dados.results.map(medida => ({
          label: medida.descricao,
          value: medida.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
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
}
