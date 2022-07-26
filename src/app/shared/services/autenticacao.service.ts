import { Injectable } from '@angular/core';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario): void {
    console.log(usuario);
  }
  
}
