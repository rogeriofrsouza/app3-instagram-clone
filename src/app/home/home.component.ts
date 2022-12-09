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

  public iconFill: string[] = ['-fill', '', ''];
  
  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.autenticacaoService.sair();
  }
  
  public incluirPublicacao(): void {
    this.atualizarIcon('add');
    let incluirPubl = this.incluirPublicacaoComponent;

    incluirPubl.estadoPublicacao = 'pendente';
    incluirPubl.tituloModal = 'Criar nova publicação';

    if (incluirPubl.imagem !== undefined)
      incluirPubl.inputImagem.nativeElement.value = '';
    
    let formulario = incluirPubl.formulario;
    formulario.setValue({ 'titulo': null, 'imagem': null });
    formulario.get('titulo')?.markAsUntouched();
  }

  public atualizarTimeline(): void {
    this.publicacoesComponent.atualizarTimeline();
  }

  public atualizarIcon(icon: string): void {
    switch (icon) {
      case 'home': this.iconFill = ['-fill', '', '']; break;
      case 'add': this.iconFill = ['', '-fill', '']; break;
      case 'user': this.iconFill = ['', '', '-fill']; break;
    }
  }

  public openChange(event: boolean): void {
    // Modal aberto
    if (event) {
      this.atualizarIcon('user');
    }
    // Modal fechado
    else {
      this.iconFill[1] === '-fill' ? this.atualizarIcon('add') : this.atualizarIcon('home');
    }
  }

}
