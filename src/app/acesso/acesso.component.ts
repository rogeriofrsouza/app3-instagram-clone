import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      transition(':enter', [ 
        style({ opacity: 0, transform: 'translate(-32px, 0)' }), // Estilo do estado inicial 'void'
        animate('500ms 0s ease-in-out', style({ opacity: 1, transform: 'translate(0, 0)' })) // Estilo do elemento ao entrar no DOM
      ])
    ]),
    trigger('animacao-painel', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(32px, 0)' }),
        animate('1.5s 0s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)' }),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public acesso: string = 'login';

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event: string): void {
    this.acesso = event;
  }

}
