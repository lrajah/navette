import { DaoInterface } from './../interfaces/dao/dao-interface';
import { ResaModel } from './resa-model';
import { ResaService } from '../services/resa.service';
import { TourneesService } from '../services/tournees.service';

export class DaoResa implements DaoInterface<ResaModel> {
  private resas: Array<ResaModel> = new Array<ResaModel>();
  private resaService: ResaService = new ResaService();
  private resa: ResaModel;
  private tourneeService:TourneesService;
  private resaNumber:string;

  public constructor(resaModel: ResaModel, tourneeService:TourneesService) {
    this.resa = resaModel;
    this.tourneeService=tourneeService;
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

  public add(resaTmp?: any): ResaModel {
    this.resaService.getAll().then((resas) => {
      resas.push(this.resa);

      this.resaService.persist(resas);
    });

    console.log('lalala' + resaTmp);

    if(resaTmp){

      console.log('lalala2' + resaTmp);
    this.tourneeService.reservRemoteTournees(resaTmp).subscribe((result) =>{
      this.resaNumber = result.numResa;
      this.tourneeService.confirmRemoteTournees(this.resaNumber).subscribe((result) =>{
      });
    });
  }
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
