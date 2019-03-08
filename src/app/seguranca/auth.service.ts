import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;
  JwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.oauthTokenUrl = `${environment.apiURL}/api/token/`;
    this.carregarToken();
  }

  login(usuario: string, senha: string) {

    const body = {
      'username' : usuario,
      'password' : senha
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),

    };

    return this.http.post(this.oauthTokenUrl, body, httpOptions)
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response.access);
        localStorage.setItem('refresh', response.refresh);
      });
  }

  obterNovoAccessToken() {

    const body = {
      'refresh' : localStorage.getItem('refresh')
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(`${this.oauthTokenUrl}refresh/`, body, httpOptions)
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response.access);
        console.log('Access Token renovado');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        this.router.navigate(['/login']);
        return Promise.resolve(null);
      });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.JwtHelper.isTokenExpired(token);
  }

  recuperaToken() {
    if (this.isAccessTokenInvalido()) {
      this.obterNovoAccessToken();
    }

    return localStorage.getItem('token');
  }

  fazerRequisicao(fn: Function): Observable<HttpResponse<Object>> {

    if (this.isAccessTokenInvalido()) {
      console.log('Requisição HTTP com access token inválido. Obtendo novo token...');

      const chamadaNovoAccessToken = this.obterNovoAccessToken()
        .then(() => {
          return fn().toPromise();
        });

      return from(chamadaNovoAccessToken);
    } else {
      return fn();
    }
  }

  private armazenarToken(token: any) {
    this.jwtPayload = this.JwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }
}

