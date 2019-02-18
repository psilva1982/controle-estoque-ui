import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class DashboardService {

  dashboardUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    this.dashboardUrl = `${environment.apiURL}/dashboard`;
   }


  buscarDados() {
    return this.auth.fazerRequisicao(() => this.http.get(this.dashboardUrl));
  }
}
