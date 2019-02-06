import { Medida } from './../models/Medida';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class UnidadeMedidaFiltro {
  medida: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class UnidadeMedidaService {

  medidasUrl = 'http://localhost:8000/medidas';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  pesquisar(filtro: UnidadeMedidaFiltro) {

    let parametros = new HttpParams();

    parametros = parametros.append('page', filtro.pagina.toString());

    if (filtro.medida) {
      parametros = parametros.append('search', filtro.medida);
    }

    return this.auth.fazerRequisicao(() => this.http.get(this.medidasUrl, { params: parametros }));
  }

  buscarPorId(id: number) {
    return this.auth.fazerRequisicao(() => this.http.get(`${this.medidasUrl}/${id}`));
  }

  adicionar(medida: Medida) {
    return this.auth.fazerRequisicao(() => this.http.post(`${this.medidasUrl}/`, medida));
  }

  atualizar(medida: Medida) {
    return this.auth.fazerRequisicao(() => this.http.put(`${this.medidasUrl}/${medida.id}/`, medida));
  }

  excluir(codigo: number) {
    return this.auth.fazerRequisicao(() => this.http.delete(`${this.medidasUrl}/${codigo}`));
  }

  listarTodas() {
    return this.auth.fazerRequisicao(() => this.http.get(this.medidasUrl));
  }
}
