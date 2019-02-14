import { Injectable } from '@angular/core';
import { ResaInterface } from '../interfaces/resa';

@Injectable({
  providedIn: 'root'
})
export class ResaService {
  private resas: Array<ResaInterface>;

  constructor() {
    this.resas = new Array<ResaInterface>();
  }
}
