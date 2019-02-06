import { Local } from './../models/Local';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LocalFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class LocalService {

  locaisUrl = 'http://localhost:8000/locais';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  pesquisar(filtro: LocalFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('page', filtro.pagina.toString());

    if (filtro.descricao) {
      parametros = parametros.append('search', filtro.descricao);
    }

    return this.auth.fazerRequisicao(() => this.http.get(this.locaisUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.locaisUrl}/${id}`));
  }

  adicionar(local: Local) {
    return this.auth.fazerRequisicao(() => this.http.post(`${this.locaisUrl}/`, local));
  }

  atualizar(local: Local) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.locaisUrl}/${local.id}/`, local));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.locaisUrl}/${codigo}`));
  }

  listarTodos() {
    return this.auth.fazerRequisicao(() => this.http.get(this.locaisUrl));
  }
}
