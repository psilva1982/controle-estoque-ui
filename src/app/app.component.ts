import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    MessageService
  ]
})
export class AppComponent {
  title = 'fluxo-caixa-ui';

  constructor(
    private router: Router
  ) {}

  exibirAplicacao() {
    let exibir = true;

    if (this.router.url === '/pagina-nao-encontrada') {
      exibir = false;
    }

    if (this.router.url === '/login') {
      exibir = false;
    }

    return exibir;
  }
}


