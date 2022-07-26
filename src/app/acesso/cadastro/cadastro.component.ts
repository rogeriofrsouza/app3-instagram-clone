import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.minLength(5) ]),
    'nome': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ]),
    'usuario': new FormControl(null, [ Validators.required, Validators.minLength(5), Validators.maxLength(20) ]),
    'senha': new FormControl(null, [ Validators.required, Validators.minLength(5) ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    console.log(this.formulario);

    if (this.formulario.status === 'INVALID') {
      this.formulario.markAllAsTouched();
    } else {
      
    }
  }

}
