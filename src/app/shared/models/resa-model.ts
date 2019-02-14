import { ResaInterface } from '../interfaces/resa';
import * as moment from 'moment';
import { ResaService } from '../services/resa.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ResaModel implements ResaInterface {
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

  public constructor(private resaService: ResaService) {}

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

  public add(): void {
    this.resaService.addResa(this);
  }

  public update(): void {
    this.resaService.updateResa(this);
  }

  public remove(): void {
    this.resaService.removeResa(this);
  }
}
