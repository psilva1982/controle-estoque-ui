import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-esquerdo',
  templateUrl: './menu-esquerdo.component.html',
  styleUrls: ['./menu-esquerdo.component.css']
})
export class MenuEsquerdoComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
