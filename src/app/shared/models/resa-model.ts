import * as moment from 'moment';
import { DaoResa } from './dao-resa';

export class ResaModel {
  private id?: number;

  /**
   * Date de la réservation par l'utilisateur
   * @var moment.Moment
   */
  private dateResa: moment.Moment;

  /**
   * Date et heure de la tournée pour laquelle la réservation
   *   a été effectuée
   * @var moment.Moment
   */
  private tourDate: moment.Moment;

  /**
   * Nombre de places réservées
   * @var number
   */
  private places: number;

  public constructor() {}

  public getId(): number {
    return this.id;
  }

  public setDateResa(date: moment.Moment): ResaModel {
    this.dateResa = date;
    return this;
  }

  public getDateResa(): moment.Moment {
    return this.dateResa;
  }

  public setTourDate(date: moment.Moment): ResaModel {
    this.tourDate = date;
    return this;
  }

  public getTourDate(): moment.Moment {
    return this.tourDate;
  }

  public setPlaces(places: number): ResaModel {
    this.places = places;
    return this;
  }

  public getPlaces(): number {
    return this.places;
  }

  public deserialize(datas: any): ResaModel {

    this.dateResa = moment(datas.dateResa);
    this.tourDate = moment(datas.tourDate);
    this.places = datas.places;

    return this;
  }
}
