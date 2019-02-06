import { UnidadeMedidaService } from './../../unidade-medida/unidade-medida.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../produtos.service';
import { Produto } from './../../models/Produto';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { SubCategoriaService } from 'src/app/subcategorias/subcategoria.service';
import { LocalService } from 'src/app/local/local.service';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css'],
  providers: [
    ErrorHandlerService
  ]
})
export class ProdutosCadastroComponent implements OnInit {

  produto = new Produto();
  categorias = [];
  categoriaSelecionada;
  subcategorias = [];
  unidadesMedida = [];
  locais = [];

  constructor(

    private messageService: MessageService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubCategoriaService,
    private localService: LocalService,
    private unidadeMedidaService: UnidadeMedidaService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.preparaEdicao();

    this.carregarCategorias();
    this.carregarUnidadesMedida();
    this.carregarLocais();
  }

  salvar(form: FormControl) {
    if (this.produto.id) {
      this.atualizaExistente();

    } else {
      this.salvaNovo(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    // Bug perca do valor padrão do selectbutton
    setTimeout(function () {
      this.produto = new Produto();
    }.bind(this), 1);

    this.router.navigate(['/produtos/novo']);
  }

  salvaNovo(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .subscribe((dados: any) => {

        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `${dados.descricao} registrado(a)` });
        this.router.navigate(['/produtos', dados.id]);
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  preparaEdicao() {
    if (this.route.snapshot.params.id) {

      const id = this.route.snapshot.params.id;

      this.produtoService.buscarPorId(id)
        .subscribe((dados: any) => {

          this.produto = dados;

          this.categoriaSelecionada = dados.subcategoria.categoria.id;
          this.buscarSubCategorias(this.categoriaSelecionada);

          this.produto.subcategoria = dados.subcategoria.id;
          this.produto.local = dados.local.id;
          this.produto.medida = dados.medida.id;
        },

          erro => this.errorHandlerService.handle(erro)
        );
    }
  }

  atualizaExistente() {
    this.produtoService.atualizar(this.produto)
      .subscribe((dados: any) => {
        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `Categoria atualizada` });
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .subscribe((dados: any) => {
        this.categorias = dados.results.map(categoria => ({
          label: categoria.nome,
          value: categoria.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  carregarUnidadesMedida() {
    this.unidadeMedidaService.listarTodas()
      .subscribe((dados: any) => {
        this.unidadesMedida = dados.results.map(medida => ({
          label: medida.descricao,
          value: medida.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  carregarLocais() {
    this.localService.listarTodos()
      .subscribe((dados: any) => {
        this.locais = dados.results.map(local => ({
          label: local.descricao,
          value: local.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoSelecionarCategoria(event) {
    this.buscarSubCategorias(event.value);
  }

  buscarSubCategorias(categoria: number) {
    this.subcategoriaService.listarPorCategoria(categoria)
      .subscribe((dados: any) => {
        this.subcategorias = dados.results.map(subcategoria => ({
          label: subcategoria.nome,
          value: subcategoria.id,
        }));
      },
        erro => this.errorHandlerService.handle(erro)
      );
  }
}

