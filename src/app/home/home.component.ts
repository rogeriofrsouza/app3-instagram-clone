import { Component, OnInit, ViewChild } from '@angular/core';

import { AutenticacaoService } from './../shared/services/autenticacao.service';
import { IncluirPublicacaoComponent } from './incluir-publicacao/incluir-publicacao.component';
import { PublicacoesComponent } from './publicacoes/publicacoes.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoesComponent') public publicacoesComponent!: PublicacoesComponent;
  @ViewChild('incluirPublicacaoComponent') public incluirPublicacaoComponent!: IncluirPublicacaoComponent;

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.autenticacaoService.sair();
  }

  public incluirPublicacao(): void {
    this.incluirPublicacaoComponent.estadoPublicacao = 'pendente';
    this.incluirPublicacaoComponent.tituloModal = 'Criar uma publicação';

    let inputImagem = this.incluirPublicacaoComponent.inputImagem;
    inputImagem !== undefined ? inputImagem.nativeElement.value = '' : null;

    let formulario = this.incluirPublicacaoComponent.formulario;
    formulario.setValue({ 'titulo': null, 'imagem': null });
    formulario.get('titulo')?.markAsUntouched();
  }

  public atualizarTimeline(): void {
    this.publicacoesComponent.atualizarTimeline();
  }

}
