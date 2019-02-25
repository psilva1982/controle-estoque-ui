import { Categoria } from './../../models/Categoria';
import { ErrorHandlerService } from './../../shared/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { CategoriaService, CategoriaFiltro } from './../categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html',
  styleUrls: ['./categorias-pesquisa.component.css'],
  providers: [
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class CategoriasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  categorias = [];
  @ViewChild('tabela') tabela;

  constructor(

    private auth: AuthService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,

  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.categoriaService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.categorias = dados.results;
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  excluir(categoria: Categoria) {

    this.confirmService.confirm({
      message: `Deseja excluir a categoria ${categoria.nome}?`,
      accept: () => {

        this.categoriaService.excluir(categoria.id)
        .subscribe(() => {

          if (this.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.pesquisar(this.filtro.pagina);
          }

          this.messageService.add({ severity: 'warn', summary: 'Excluída', detail: 'Categoria excluída'});
        },

        erro => this.errorHandlerService.handle(erro)
        );
      },
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina + 1);
  }
}
