import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  public progress: number = 0;
  public percentage: string = '';
  public state: string = '';

  constructor() { }
}
