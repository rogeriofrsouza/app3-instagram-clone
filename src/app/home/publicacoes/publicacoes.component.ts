import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

import { Publicacao } from './../../shared/models/publicacao.model';
import { DbService } from './../../shared/services/db.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string = '';
  public publicacoes: Publicacao[] = [];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    const auth: Auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email !== null ? user.email : '';

        this.atualizarTimeline();
      }
    });
  }

  public atualizarTimeline(): void {
    this.dbService.consultaPublicacoes(this.email)
      .then((publicacoes: Publicacao[]) => this.publicacoes = publicacoes)
      .catch((error: Error) => console.log(error));
  }

}
