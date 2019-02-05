import { Categoria } from './../../models/Categoria';
import { SubCategoriaService } from './../subcategoria.service';
import { FormControl } from '@angular/forms';
import { CategoriaService } from './../../categorias/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubCategoria } from 'src/app/models/SubCategoria';

@Component({
  selector: 'app-subcategorias-cadastro',
  templateUrl: './subcategorias-cadastro.component.html',
  styleUrls: ['./subcategorias-cadastro.component.css'],
  providers: [
    ErrorHandlerService,
  ]
})
export class SubcategoriasCadastroComponent implements OnInit {

  subcategoria = new SubCategoria();
  categoria = new Categoria();
  categorias = [];

  constructor(

    private messageService: MessageService,
    private subcategoriaService: SubCategoriaService,
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

    this.preparaEdicao();
    this.carregarCategorias();
  }

  salvar(form: FormControl) {
    if (this.subcategoria.id) {
      this.atualizaExistente();

    } else {
      this.salvaNovo(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    // Bug perca do valor padrão do selectbutton
    setTimeout(function () {
      this.subcategoria = new SubCategoria();
    }.bind(this), 1);

    this.router.navigate(['/subcategorias/nova']);
  }

  salvaNovo(form: FormControl) {
    this.subcategoriaService.adicionar(this.subcategoria)
      .subscribe((dados: any) => {

        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `Subcategoria ${dados.nome} registrada` });
        this.router.navigate(['/subcategorias', dados.id]);
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  preparaEdicao() {
    if (this.route.snapshot.params.id) {


      const id = this.route.snapshot.params.id;

      this.subcategoriaService.buscarPorId(id)
        .subscribe((dados: any) => {

          this.subcategoria = dados;
          this.subcategoria.categoria = dados.categoria.id;
        },

          erro => this.errorHandlerService.handle(erro)
        );
    }
  }

  atualizaExistente() {
    this.subcategoriaService.atualizar(this.subcategoria)
      .subscribe((dados: any) => {
        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `Subcategoria atualizada` });
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

  defineNomeCategoria(event) { 
    console.log(event.originalEvent.srcElement.textContent);
    this.subcategoria.categoria.nome = event.originalEvent.srcElement.textContent;
  }
}
