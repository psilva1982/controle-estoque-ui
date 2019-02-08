import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DashboardService {

  dashboardUrl = 'http://localhost:8000/dashboard';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }


  buscarDados() {
    return this.auth.fazerRequisicao(() => this.http.get(this.dashboardUrl));
  }
}
