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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.progressoService.progress = progress;
        this.progressoService.percentage = `Upload is ${progress}% done`;

        switch (snapshot.state) {
          case 'paused': this.progressoService.state = 'Upload is paused'; break;
          case 'running': this.progressoService.state = 'Upload is running'; break;
        }
      }, 
      (error: StorageError) => {
        this.progressoService.state = 'Error on upload';
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          this.progressoService.state = `File available at ${downloadURL}`;
        });
      }
    );
  }

}
