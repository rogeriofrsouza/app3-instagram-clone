import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticacaoService } from './../../shared/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: UntypedFormGroup = new UntypedFormGroup({
    'email': new UntypedFormControl(null, [ Validators.required, Validators.minLength(6), Validators.email ]),
    'senha': new UntypedFormControl(null, [ Validators.required, Validators.minLength(6) ])
  });

  public errorMessage: string = '';

  constructor(private autenticacaoService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
    this.autenticacaoService.autenticado() ? this.router.navigateByUrl('/home') : null;
  }

  public autenticarUsuario(): void {
    this.autenticacaoService.autenticarUsuario(this.formulario.value.email, this.formulario.value.senha)
      .then(() => this.router.navigateByUrl('/home'))
      .catch((error: Error) => this.errorMessage = error.message);
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

}
