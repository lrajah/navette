import { ResaModel } from './../models/resa-model';
import { Injectable } from '@angular/core';
import { ResaInterface } from '../interfaces/resa';

@Injectable({
  providedIn: 'root'
})
export class ResaService {
  private resas: Array<ResaModel>;

  constructor() {}

  public addResa(resa: ResaModel): void {
    if (!this.resas) {
      this.resas = new Array<ResaModel>();
    }
    this.resas.push(resa);
    this._persist();
  }

  public updateResa(resa: ResaModel) {
    /*
    const indice: number = this.resas.findIndex((obj) => {
      return obj.dateResa === resa.dateResa
    });
    this.resas[indice] = resa;
    */

    this.resas[this.resas.indexOf(resa)] = resa;
    this._persist();
  }

  public removeResa(resa: ResaModel) {
    this.resas.splice(this.resas.indexOf(resa), 1);
    this._persist();
  }

  public getAll(): Promise<Array<ResaModel>> | Array<ResaModel> {
    if (this.resas) {
      return this.resas;
    }

    return new Promise((resolve) => {
      // Faudrait aller lire la base de données
      this._getAll();
      resolve(this.resas);
    });
  }

  private _persist() {
    localStorage.setItem(
      'resas',
      JSON.stringify(
        this.resas.map(
          (obj: ResaModel) => {
            return {
              dateResa: obj.getDateResa(),
              tourDate: obj.getTourDate(),
              places: obj.getPlaces()
            };
          }
        )
      )
    );
  }

  private _getAll(): void {
    const jsonData = localStorage.getItem('resas');
    if (jsonData) {
      this.resas = JSON.parse(jsonData);
    } else {
      this.resas = new Array<ResaModel>();
    }
  }
}
