import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {

    let msg: string;
    let erro = false;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
      erro = true;

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      if (errorResponse.status === 400) {

        if (errorResponse.error.codigo) {
          msg = errorResponse.error.codigo;

        } else if (errorResponse.error.nome) {
          msg = errorResponse.error.nome;

        } else if (errorResponse.error.non_field_errors) {
          msg = 'Login ou senha inválida';

        } else if (errorResponse.error.username) {
          msg = 'Informe o login';

        } else if (errorResponse.error.password) {
          msg = 'Informe a senha';

        } else if (errorResponse.error[0]) {
          msg = errorResponse.error[0];

        } else {
          msg = 'Erro na requisição bad request';
        }

        erro = true;

      } else if (errorResponse.status === 401) {
        this.router.navigate(['/login']);
        msg = 'Sua sessão expirou. Faça o login novamente.';
        erro = true;

      } else if (errorResponse.status === 403) {
        msg = errorResponse.error.detail;
        erro = true;

      } else {

        try {

          msg = errorResponse.error.detail;
          erro = true;

        } finally {

          msg = 'Ocorreu um erro ao processar a sua solicitação';
          erro = true;
        }
      }

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      erro = true;
    }

    if (erro) {
      this.messageService.clear();
      this.messageService.add({ key: 'mensagem', severity: 'error', detail: msg });
      console.log(msg);
      console.error(errorResponse);
    }
  }
}
