import { ProgressoService } from './progresso.service';
import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, getDatabase, onValue, push, ref as databaseRef, ThenableReference } from 'firebase/database';
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, StorageError, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {
    const db: Database = getDatabase();
    push(databaseRef(db, `publicacoes/${btoa(publicacao.email)}`), { titulo: publicacao.titulo })
      .then((reference: any) => {

        let nomeImagem: string = reference.key;
        
        const storage: FirebaseStorage = getStorage();
        const uploadTask = uploadBytesResumable(storageRef(storage, `imagens/${nomeImagem}`), publicacao.imagem);
    
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

  public consultaPublicacoes(emailUsuario: string): any {
    const db: Database = getDatabase();
    const publicacoesRef: DatabaseReference = databaseRef(db, `publicacoes/${btoa(emailUsuario)}`);
    
    onValue(publicacoesRef, (snapshot: DataSnapshot) => {
      console.log(snapshot);
      console.log(snapshot.val());
    })
  }

}
