import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { MessageService } from 'primeng/api';
import { Categoria } from './../../models/Categoria';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorias-cadastro',
  templateUrl: './categorias-cadastro.component.html',
  styleUrls: ['./categorias-cadastro.component.css'],
  providers: [
    ErrorHandlerService,
  ]
})
export class CategoriasCadastroComponent implements OnInit {


  categoria = new Categoria();

  constructor(

    private messageService: MessageService,
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() { 
    this.preparaEdicao();
  }


  salvar(form: FormControl) {
    if (this.categoria.id) {
      this.atualizaExistente();

    } else {
      this.salvaNovo(form);
    }
  }

  novo(form: FormControl) {
    form.reset();

    // Bug perca do valor padrão do selectbutton
    setTimeout(function () {
      this.categoria = new Categoria();
    }.bind(this), 1);

    this.router.navigate(['/categorias/nova']);
  }

  salvaNovo(form: FormControl) {
    this.categoriaService.adicionar(this.categoria)
      .subscribe((dados: any) => {

        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `Categoria ${dados.nome} registrada` });
        this.router.navigate(['/categorias', dados.id]);
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  preparaEdicao() {
    if (this.route.snapshot.params.id) {


      const id = this.route.snapshot.params.id;

      this.categoriaService.buscarPorId(id)
        .subscribe((dados: any) => {

          this.categoria = dados;

        },

          erro => this.errorHandlerService.handle(erro)
        );
    }
  }

  atualizaExistente() {
    this.categoriaService.atualizar(this.categoria)
      .subscribe((dados: any) => {
        this.messageService.add({ severity: 'success', summary: dados.nome, detail: `Categoria atualizada` });
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }
}
