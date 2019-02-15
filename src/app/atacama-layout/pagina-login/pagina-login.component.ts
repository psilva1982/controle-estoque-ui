import { FormControl } from '@angular/forms';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css'],
  providers: [
    AuthService,
    ErrorHandlerService
  ]
})
export class PaginaLoginComponent implements OnInit {

  usuario: string;
  senha: string;

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.removeToken()
  }

  login(form: FormControl) {
    this.authService.login(this.usuario, this.senha)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
