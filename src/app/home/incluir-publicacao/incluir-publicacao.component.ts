import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { interval, Subject, takeUntil } from 'rxjs';

import { DbService } from './../../shared/services/db.service';
import { ProgressoService } from './../../shared/services/progresso.service';

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
  private imagem: FileList | null = null;

  constructor(private db: DbService, private progressoService: ProgressoService) { }

  ngOnInit(): void {
    const auth: Auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email !== null ? user.email : '';
      }
    });
  }

  public publicar(): void {
    this.db.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem?.item(0)
    });

    const intervalo = interval(1500);
    const continua = new Subject<boolean>();
    
    continua.next(true);
    const acompanhamentoUpload = intervalo.pipe(takeUntil(continua));

    acompanhamentoUpload.subscribe(() => {
      console.log(this.progressoService.percentage);
      console.log(this.progressoService.state);

      if (this.progressoService.state.substring(0, 17) === 'File available at') {
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
