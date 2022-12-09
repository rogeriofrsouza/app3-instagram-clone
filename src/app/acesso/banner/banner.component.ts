import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Imagem } from '../../shared/models/imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({ opacity: 0 })),
      state('visivel', style({ opacity: 1 })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public imagens: Imagem[] = [
    { estado: 'visivel', url: './assets/banner-acesso/img_1.png', alt: 'Home de usuário Instagram' },
    { estado: 'escondido', url: './assets/banner-acesso/img_2.png', alt: 'Publicação de usuário Instagram contendo uma foto' },
    { estado: 'escondido', url: './assets/banner-acesso/img_3.png', alt: 'Opções de edição de uma imagem no Instagram' },
    { estado: 'escondido', url: './assets/banner-acesso/img_4.png', alt: 'Tela de chat de usuário Instagram' },
    { estado: 'escondido', url: './assets/banner-acesso/img_5.png', alt: 'Funcionalidade de câmera do Instagram' }
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 4000);
  }

  public logicaRotacao(): void {
    let idx: number = 0;

    for (let i: number = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';
        idx = i === 4 ? 0 : i + 1;

        break;
      }
    }
    
    this.imagens[idx].estado = 'visivel';

    setTimeout(() => this.logicaRotacao(), 4000);
  }

}
