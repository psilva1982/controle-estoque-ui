import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Não encontrado');
  }

}
