import { DaoInterface } from './../interfaces/dao/dao-interface';
import { ResaModel } from './resa-model';
import { ResaService } from '../services/resa.service';

export class DaoResa implements DaoInterface<ResaModel> {
  private resas: Array<ResaModel> = new Array<ResaModel>();
  private resaService: ResaService = new ResaService();
  private resa: ResaModel;

  public constructor(resaModel: ResaModel) {
    this.resa = resaModel;
  }

  public find(id: number): ResaModel {
    const index: number = this.resas.findIndex(
      (obj: ResaModel) => {
        return obj.getId() === id;
      }
    );
    return index !== -1 ? this.resas[index] : null;
  }

  findAll(): void | ResaModel[] {
    return this.resas;
  }

  findBy(property: string, value: any): void | ResaModel[] {
  }

  public add(): ResaModel {
    this.resaService.getAll().then((resas) => {
      resas.push(this.resa);

      this.resaService.persist(resas);
    });
    return this.resa;
  }

  update(): ResaModel {
    this.resas[this.resas.indexOf(this.resa)] = this.resa;

    this.resaService.persist(this.resas);

    return this.resa;
  }
  remove(): ResaModel {
    this.resas.splice(this.resas.indexOf(this.resa), 1);

    return this.resa;
  }


}
