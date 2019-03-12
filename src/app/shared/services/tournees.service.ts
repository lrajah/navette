import { TourneeInterface } from './../interfaces/tournee';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ResaService } from './resa.service';
import { ResaModel } from '../models/resa-model';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourneesService {
  private resaService: ResaService = new ResaService();

  constructor(private httpClient: HttpClient) {
  }
  public getRemoteTournees(date?: moment.Moment): Observable<any> {
    if (date) {

      return this.httpClient.get<any[]>(environment.apiRoot + 'api/client/' + moment(date).format('YYYY-MM-DD'));

    }
    return this.httpClient.get<any[]>(environment.apiRoot + 'api/client/' + moment().format('YYYY-MM-DD'));

  }
  public chooseRemoteTournees(date: moment.Moment, nbPlace: number): Observable<any> {

    return this.httpClient.get<any[]>(
      environment.apiRoot + 'api/client/choose?date=' + moment(date)
        .format('YYYY-MM-DD-HH-mm') + '&place=' + nbPlace, { observe: 'response' }
    );
  }
  public reservRemoteTournees(reservation: any): Observable<any> {
    const uri: string = environment.apiRoot + 'api/client/reservation/';
    console.log('reser' + reservation);
    return this.httpClient.post<any[]>(uri, reservation);


  }
  public confirmRemoteTournees(numResa: string): Observable<any> {
    const uri: string = environment.apiRoot + 'api/client/reservation/confirm/' + numResa;
    console.log('confirm' + numResa);
    return this.httpClient.get<any[]>(uri);


  }


  public getTournees(): Promise<Array<TourneeInterface>> {
    return new Promise((resolve) => {
      const tournees: Array<TourneeInterface> = new Array<TourneeInterface>();
      const today: moment.Moment = moment();
      this.resaService.getAll().then((resas) => {
        tournees.push(
          {
            hour: today.clone().hour(8).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(8).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(11).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(11).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(14).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(14).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(17).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(17).minute(0).second(0)),
            resa: 1
          },
        );

        resolve(tournees);
      });

    });
  }

  private setDispos(resas: Array<ResaModel>, tourHour: moment.Moment): number {

    const indice: number = resas.findIndex((obj) => {
      return obj.getTourDate().isSame(tourHour, 'hour');
    });

    if (indice !== -1) {
      return 8 - resas[indice].getPlaces();
    }
    return 8;
  }
}
