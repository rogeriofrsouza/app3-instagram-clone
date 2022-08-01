import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AutenticacaoService } from './../../shared/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.email ]),
    'senha': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  public errorMessage: string = '';

  constructor(private autenticacaoService: AutenticacaoService) { }

  ngOnInit(): void {
  }

  public autenticarUsuario(): void {
    if (this.formulario.status === 'INVALID') {
      this.formulario.markAllAsTouched();
    
    } else {
      this.autenticacaoService.autenticarUsuario(this.formulario.value.email, this.formulario.value.senha)
        .then(error => this.errorMessage = error !== undefined ? error.message : '');
    }

  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

}
