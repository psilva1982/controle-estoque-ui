import { Categoria } from './../models/Categoria';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CategoriaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8000/categorias/';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  pesquisar(filtro: CategoriaFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('offset', (filtro.pagina * filtro.itensPorPagina).toString());

    if (filtro.nome) {
      parametros = parametros.append('search', filtro.nome);
    }

    return this.auth.fazerRequisicao(() => this.http.get(this.categoriasUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.categoriasUrl}${id}`));
  }

  adicionar(categoria: Categoria) {
    return this.auth.fazerRequisicao(() => this.http.post(this.categoriasUrl, categoria));
  }

  atualizar(categoria: Categoria) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.categoriasUrl}${categoria.id}/`, categoria));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.categoriasUrl}${codigo}`));
  }

  listarTodas() {
    return this.auth.fazerRequisicao(() => this.http.get(this.categoriasUrl));
  }
}
