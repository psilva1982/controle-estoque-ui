import { SubCategoria } from './../models/SubCategoria';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export class SubCategoriaFiltro {
  nome: string;
  categoria: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class SubCategoriaService {

  subcategoriasUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.subcategoriasUrl = `${environment.apiURL}/subcategorias`;
  }

  pesquisar(filtro: SubCategoriaFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('page', filtro.pagina.toString());

    if (filtro.nome) {
      parametros = parametros.append('search', filtro.nome);
    }

    if (filtro.categoria) {
      parametros = parametros.append('categoria', filtro.categoria);
    }

    return this.auth.fazerRequisicao(() => this.http.get(this.subcategoriasUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.subcategoriasUrl}/${id}`));
  }

  adicionar(subcategoria: SubCategoria) {
    return this.auth.fazerRequisicao(() => this.http.post(`${this.subcategoriasUrl}/`, subcategoria));
  }

  atualizar(subcategoria: SubCategoria) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.subcategoriasUrl}/${subcategoria.id}/`, subcategoria));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.subcategoriasUrl}/${codigo}`));
  }

  listarTodas() {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.subcategoriasUrl}?page_size=0`));
  }

  listarPorCategoria(categoria: number) {
    let parametros = new HttpParams();
    parametros = parametros.append('categoria', categoria.toString());

    return this.auth.fazerRequisicao(() => this.http.get(`${this.subcategoriasUrl}?page_size=0`, { params: parametros }));
  }
}
