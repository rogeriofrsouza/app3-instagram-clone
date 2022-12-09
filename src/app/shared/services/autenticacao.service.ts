import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, getAuth, getIdToken, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Database, getDatabase, ref, set } from 'firebase/database';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public idToken: string = '';

  constructor(private router: Router) { }

  // Cadastrar usuário
  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    const auth: Auth = getAuth();
    
    return createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
      .then((userCredential: UserCredential) => {
        console.log(userCredential);
        usuario.senha = '';

        const db: Database = getDatabase();
        set(ref(db, `usuario_detalhe/${btoa(usuario.email)}`), usuario);
      });
  }

  // Autenticar usuário
  public autenticarUsuario(email: string, senha: string): Promise<any> {
    const auth: Auth = getAuth();

    return signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential: UserCredential) => {
        console.log(userCredential);
      
        getIdToken(userCredential.user)
          .then((idToken: string) => {
            localStorage.setItem('idToken', idToken);
            this.idToken = idToken;
            this.router.navigateByUrl('/home');
          });
      });
  }

  // Usuário autenticado
  public autenticado(): boolean {
    if (this.idToken === '') {
      let token: string | null = localStorage.getItem('idToken');
      
      token === null ? this.router.navigateByUrl('') : this.idToken = token;
    }
    
    return this.idToken !== '';
  }

  // SignOut
  public sair(): void {
    const auth: Auth = getAuth();
    
    signOut(auth)
      .then(() => {
        localStorage.removeItem('idToken');
        this.idToken = '';
        this.router.navigateByUrl('');
      })
      .catch((error: Error) => console.log(error));
  }
  
}
