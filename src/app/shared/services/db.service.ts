import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  public publicar(publicacao: any): void {
    const db: Database = getDatabase();

    push(ref(db, `publicacoes/${btoa(publicacao.email)}`), { titulo: publicacao.titulo });
  }

}
