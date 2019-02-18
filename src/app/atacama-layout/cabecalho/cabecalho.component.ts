import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  adminUrl: string;
  alterarSenhaUrl: string;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.adminUrl = `${environment.adminURL}/`;
    this.alterarSenhaUrl = `${environment.adminURL}/password_change`;
  }

}
