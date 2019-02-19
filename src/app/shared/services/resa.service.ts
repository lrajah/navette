import { ResaModel } from './../models/resa-model';

export class ResaService {
  private resas: Array<ResaModel>;

  constructor() {
    console.log('Service done');
  }

  public getAll(): Promise<Array<ResaModel>> {
    if (this.resas) {
      console.log('resaservice::getAll::resas already loaded');
      return new Promise((resolve) => {
        resolve(this.resas);
      });
    } else {
      console.log('resaservice::getAll::load resas');
      return this._getAll();
    }
  }

  public persist(resas: Array<ResaModel>) {
    localStorage.setItem(
      'resas',
      JSON.stringify(
        resas
      )
    );
  }

  private _getAll(): Promise<Array<ResaModel>> {
    return new Promise((resolve) => {
      this.resas = new Array<ResaModel>();
      const jsonData = localStorage.getItem('resas');
      if (jsonData) {
        this.resas = JSON.parse(jsonData).map((resa: any) => {
          return (new ResaModel()).deserialize(resa);
        });
      }
      resolve(this.resas);
    });

  }
}
