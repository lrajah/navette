import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResaModel } from '../models/resa-model';

@Injectable({
  providedIn: 'root'
})
export class ResaSharingService {
  private bsResa: BehaviorSubject<ResaModel>;
  public resaShare;

  constructor() {
    this.bsResa = new BehaviorSubject<ResaModel>(null);
    this.resaShare = this.bsResa.asObservable();
   }

  public sendResa(resa: ResaModel): void {
    this.bsResa.next(resa);
  }
}
