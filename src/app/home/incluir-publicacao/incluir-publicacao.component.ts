import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';

import { DbService } from './../../shared/services/db.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [ Validators.required ])
  })

  public email: string = '';

  constructor(private db: DbService) { }

  ngOnInit(): void {
    const auth: Auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      console.log(user);

      if (user) {
        this.email = user.email !== null ? user.email : '';
      }
    })
  }

  public publicar(): void {
    this.db.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
    });
  }

}
