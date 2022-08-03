import { ProgressoService } from './progresso.service';
import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref as databaseRef } from 'firebase/database';
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, StorageError, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): void {
    const db: Database = getDatabase();
    push(databaseRef(db, `publicacoes/${btoa(publicacao.email)}`), { titulo: publicacao.titulo });
    
    let nomeImagem: number = Date.now();

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
  }

}
