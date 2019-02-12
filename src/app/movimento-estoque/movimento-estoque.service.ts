import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movimento } from '../models/Movimento';

export class MovimentoFiltro {
  produto: string;
  tipo: string;
  data: Date;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class MovimentoEstoqueService {

  movimentosUrl = 'http://localhost:8000/movimentos';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  pesquisar(filtro: MovimentoFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('page', filtro.pagina.toString());

    if (filtro.produto) {
        parametros = parametros.append('produto', filtro.produto);
    }

    if (filtro.tipo) {
        parametros = parametros.append('tipo_movimento', filtro.tipo);
    }


    return this.auth.fazerRequisicao(() => this.http.get(this.movimentosUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.movimentosUrl}/${id}`));
  }

  adicionar(movimento: Movimento) {
    return this.auth.fazerRequisicao(() => this.http.post(`${this.movimentosUrl}/`, movimento));
  }

  atualizar(movimento: Movimento) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.movimentosUrl}/${movimento.id}/`, movimento));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.movimentosUrl}/${codigo}/`));
  }

  listarTodos() {
    return this.auth.fazerRequisicao(() => this.http.get(this.movimentosUrl));
  }
}
