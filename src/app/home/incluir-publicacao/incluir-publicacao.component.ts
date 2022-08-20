import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { interval, Observable, Subject, takeUntil } from 'rxjs';

import { DbService } from './../../shared/services/db.service';
import { ProgressoService } from './../../shared/services/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter();

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  public emailUsuario: string = '';
  public imagem!: File;

  public estadoPublicacao: string = '';
  public progressoUpload: number = 0;
  public downloadURL: string = '';
  public erro: string = '';

  constructor(private dbService: DbService, private progressoService: ProgressoService) { }

  ngOnInit(): void {
    const auth: Auth = getAuth();

    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.emailUsuario = user.email !== null ? user.email : '';
      }
    });
  }

  public publicar(): void {
    this.dbService.publicar(this.formulario.value.titulo, this.emailUsuario, this.imagem);

    const continua: Subject<boolean> = new Subject();
    continua.next(true);

    const intervalo: Observable<number> = interval(500);
    const acompanhamentoUpload: Observable<number> = intervalo.pipe(takeUntil(continua));

    acompanhamentoUpload.subscribe(() => {
      this.estadoPublicacao = this.progressoService.estado;
      this.progressoUpload = this.progressoService.progresso;

      if (this.estadoPublicacao === 'concluido') {
        this.downloadURL = this.progressoService.downloadURL;
        continua.next(false);
        this.atualizarTimeline.emit();
        
      } else if (this.estadoPublicacao === 'erro') {
        this.erro = this.progressoService.erro;
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files![0];
  }

}
