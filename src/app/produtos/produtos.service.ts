import { Produto } from './../models/Produto';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProdutoFiltro {
  valor: string;
  subcategoria: string;
  local: string;
  medida: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class ProdutoService {

  produtosUrl = 'http://localhost:8000/produtos';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  pesquisar(filtro: ProdutoFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('page', filtro.pagina.toString());

    if (filtro.valor) {
      parametros = parametros.append('search', filtro.valor);
    }

    if (filtro.local) {
        parametros = parametros.append('local', filtro.local);
    }

    if (filtro.medida) {
        parametros = parametros.append('medida', filtro.medida);
    }

    if (filtro.subcategoria) {
      parametros = parametros.append('subcategoria', filtro.subcategoria);
    }

    return this.auth.fazerRequisicao(() => this.http.get(this.produtosUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.produtosUrl}/${id}`));
  }

  verificarEstoque(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.produtosUrl}/${id}/estoque`));
  }

  adicionar(produto: Produto) {
    return this.auth.fazerRequisicao(() => this.http.post(`${this.produtosUrl}/`, produto));
  }

  atualizar(produto: Produto) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.produtosUrl}/${produto.id}/`, produto));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.produtosUrl}/${codigo}`));
  }

  listarTodos() {
    return this.auth.fazerRequisicao(() => this.http.get(this.produtosUrl));
  }
}
