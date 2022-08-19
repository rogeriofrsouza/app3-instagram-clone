import { Publicacao } from './../models/publicacao.model';
import { Injectable } from '@angular/core';
import { Database, DataSnapshot, get, getDatabase, orderByKey, push, query, ref as databaseRef } from 'firebase/database';
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, StorageError, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from 'firebase/storage';

import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(titulo: string, emailUsuario: string, imagem: File): void {
    const db: Database = getDatabase();
    
    push(databaseRef(db, `publicacoes/${btoa(emailUsuario)}`), { titulo: titulo })
      .then((reference: any) => {

        let nomeImagem: string = reference.key;
        
        const storage: FirebaseStorage = getStorage();
        const uploadTask: UploadTask = uploadBytesResumable(storageRef(storage, `imagens/${nomeImagem}`), imagem);
    
        uploadTask.on('state_changed', 
          (snapshot: UploadTaskSnapshot) => {
            this.progressoService.progresso = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    
            switch (snapshot.state) {
              case 'paused': this.progressoService.estado = 'interrompido'; break;
              case 'running': this.progressoService.estado = 'andamento'; break;
            }
          }, 
          (error: StorageError) => {
            this.progressoService.estado = 'erro';
            this.progressoService.erro = error.serverResponse !== null ? error.serverResponse : '';
    
            console.log(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
              this.progressoService.estado = 'concluido';
              this.progressoService.downloadURL = downloadURL;
            });
          }
        );
      });
  }

  public consultaPublicacoes(emailUsuario: string): Promise<Publicacao[]> {
    return new Promise((resolve, reject) => {
      const db: Database = getDatabase();

      get(query(databaseRef(db, `publicacoes/${btoa(emailUsuario)}`), orderByKey()))
        .then((snapshot: DataSnapshot) => {
          let publicacoes: Publicacao[] = [];
  
          if (snapshot.exists()) {    
            snapshot.forEach((child: DataSnapshot) => {
              let publicacao: Publicacao = child.val();
              publicacao.key = child.key !== null ? child.key : '';
              
              publicacoes.push(publicacao);
            });
          } else {
            console.log('Nenhum dado disponível');
          }
          return publicacoes.reverse();
        })
        .then((publicacoes: Publicacao[]) => {
          const storage: FirebaseStorage = getStorage();

          publicacoes.forEach(publicacao => {
            getDownloadURL(storageRef(storage, `imagens/${publicacao.key}`))
              .then((downloadURL: string) => {
                publicacao.urlImagem = downloadURL;
                
                get(databaseRef(db, `usuario_detalhe/${btoa(emailUsuario)}`))
                  .then((snapshot: DataSnapshot) => {
                    publicacao.nomeUsuario = snapshot.val().nome;
                  });
              });
          });
          setTimeout(() => resolve(publicacoes), 1000);
        })
        .catch(error => reject(error));
    });
  }

}
