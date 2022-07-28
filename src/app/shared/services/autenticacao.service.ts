import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { Database, getDatabase, ref, set } from 'firebase/database';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    const auth: Auth = getAuth();
    
    return createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
      .then((user: UserCredential) => {
        console.log(user);
        usuario.senha = '';

        const db: Database = getDatabase();
        set(ref(db, `usuario_detalhe/${btoa(usuario.email)}`), usuario);
      })
      .catch((error: Error) => console.log(error));
  }

  public autenticarUsuario(email: string, senha: string): void {
    const auth: Auth = getAuth();

    signInWithEmailAndPassword(auth, email, senha)
      .then((user: UserCredential) => console.log(user))
      .catch((error: Error) => console.log(error));
  }
  
}
