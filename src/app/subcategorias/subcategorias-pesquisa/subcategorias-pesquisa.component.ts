import { CategoriaService } from './../../categorias/categoria.service';
import { SubCategoriaFiltro, SubCategoriaService } from './../subcategoria.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { SubCategoria } from 'src/app/models/SubCategoria';


@Component({
  selector: 'app-subcategorias-pesquisa',
  templateUrl: './subcategorias-pesquisa.component.html',
  styleUrls: ['./subcategorias-pesquisa.component.css'],
  providers: [
    ConfirmationService,
    ErrorHandlerService
  ]
})
export class SubcategoriasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new SubCategoriaFiltro();
  subcategorias = [];
  categorias = [];

  @ViewChild('tabela') tabela;

  constructor(

    private subcategoriaService: SubCategoriaService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,

  ) { }

  ngOnInit() {
    this.carregarCategorias();
  }


  pesquisar(pagina = 1) {

    this.filtro.pagina = pagina;

    this.subcategoriaService.pesquisar(this.filtro)
      .subscribe((dados: any) => {
        this.totalRegistros = dados.count;
        this.subcategorias = dados.results;
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  excluir(subcategoria: SubCategoria) {

    this.confirmService.confirm({
      message: `Deseja excluir a subcategoria ${subcategoria.nome}?`,
      accept: () => {

        this.subcategoriaService.excluir(subcategoria.id)
        .subscribe(() => {

          if (this.tabela.first === 0) {
            this.pesquisar();
          } else {
            this.pesquisar(this.filtro.pagina);
          }

          this.messageService.add({ severity: 'warn', summary: 'Excluída', detail: 'Subcategoria excluída'});
        },

        erro => this.errorHandlerService.handle(erro)
        );
      },
    });
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .subscribe((dados: any) => {
        this.categorias = dados.map(categoria => ({
          label: categoria.nome,
          value: categoria.id,
        }));
      },

        erro => this.errorHandlerService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina + 1);
  }
}
