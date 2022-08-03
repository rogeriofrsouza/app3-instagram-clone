import { onAuthStateChanged, getAuth, Auth, User } from 'firebase/auth';
import { Component, OnInit } from '@angular/core';

import { DbService } from './../../shared/services/db.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string = '';

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    const auth: Auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email !== null ? user.email : '';

        this.atualizarTimeline();
      }
    })
  }

  public atualizarTimeline(): void {
    this.dbService.consultaPublicacoes(this.email);
  }

}
