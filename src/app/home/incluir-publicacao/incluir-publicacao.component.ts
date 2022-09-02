import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  @Output() public atualizarHomeIcon: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputImagem') public inputImagem!: ElementRef;

  public formulario = new UntypedFormGroup({
    'titulo': new UntypedFormControl(null, [ Validators.required, Validators.minLength(6) ]),
    'imagem': new UntypedFormControl(null, [ Validators.required ])
  });

  public emailUsuario: string = '';
  public imagem!: File;
  public tituloModal: string = '';

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

      switch (this.estadoPublicacao) {
        case 'andamento': 
          this.tituloModal = 'Publicação em andamento';
          break;

        case 'concluido': 
          this.tituloModal = 'Publicação realizada com sucesso';
          this.downloadURL = this.progressoService.downloadURL;
          continua.next(false);
          this.atualizarTimeline.emit();
          break;

        case 'erro':
          this.tituloModal = 'Erro na publicação';
          this.erro = this.progressoService.erro;
          continua.next(false);
          break;
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files![0];
    this.formulario.patchValue({ 'imagem': this.imagem });
  }

  public atualizarIconMenu(): void {
    this.atualizarHomeIcon.emit();
  }

  public fechouModal(event: any): void {
    if (event.srcElement.id === 'incluirPublicacaoModal')
      this.atualizarIconMenu();
  }
}
