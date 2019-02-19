import { TourneeInterface } from './../interfaces/tournee';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TourneesService {

  constructor() { }

  public getTournees(): Promise<Array<TourneeInterface>> {
    return new Promise((resolve) => {
      const tournees: Array<TourneeInterface> = new Array<TourneeInterface>();
      const today: moment.Moment = moment();

      tournees.push(
          {
          hour: today.clone().hour(8).minute(0).second(0),
          dispo: 8
          },
          {
            hour: today.clone().hour(11).minute(0).second(0),
            dispo: 8
          },
          {
            hour: today.clone().hour(14).minute(0).second(0),
            dispo: 8
          },
          {
            hour: today.clone().hour(17).minute(0).second(0),
            dispo: 8
          },
        );

      resolve(tournees);
    });
  }
}
