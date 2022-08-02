import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref as databaseRef } from 'firebase/database';
import { FirebaseStorage, getDownloadURL, getStorage, ref as storageRef, StorageError, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }

  public publicar(publicacao: any): void {
    const db: Database = getDatabase();
    push(databaseRef(db, `publicacoes/${btoa(publicacao.email)}`), { titulo: publicacao.titulo });
    
    let nomeImagem: number = Date.now();

    const storage: FirebaseStorage = getStorage();
    const uploadTask = uploadBytesResumable(storageRef(storage, `imagens/${nomeImagem}`), publicacao.imagem);

    uploadTask.on('state_changed', 
      (snapshot: UploadTaskSnapshot) => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused': console.log('Upload is paused'); break;
          case 'running': console.log('Upload is running'); break;
        }
      }, 
      (error: StorageError) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

}
