import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  public progresso: number = 0;
  public estado: string = '';
  public downloadURL: string = '';
  public erro: string = '';

  constructor() { }
}
