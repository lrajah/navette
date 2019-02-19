import { ResaModel } from './../../shared/models/resa-model';

import { TourneesService } from './../../shared/services/tournees.service';
import { Component, Inject, OnInit } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { PaymentDialogComponent } from './../payment-dialog/payment-dialog.component';

import * as moment from 'moment';
import { ResaService } from 'src/app/shared/services/resa.service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  public tournees: Array<TourneeInterface>;
  // tslint:disable-next-line:no-inferrable-types
  public progress: boolean = true;

  constructor(
    private tourneeService: TourneesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tourneeService.getTournees().then((tournees) => {
      this.tournees = tournees;
      this.progress = false;
    });
  }

  public isDisabled(tour: TourneeInterface): boolean {
    const today: moment.Moment = moment();
    return tour.hour.isBefore(today, 'minute') || tour.dispo === 0;
  }

  public receivePlaces(places: any): void {
    console.log('Places demandées : ' + places.places);
    this.tournees[this.tournees.indexOf(places.tour)].resa = places.places;
  }

  public openPaymentDialog(tour: TourneeInterface): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '28.125em',
      data: tour
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const resa: ResaModel = (new ResaModel())
          .setDateResa(moment())
          .setPlaces(tour.resa)
          .setTourDate(tour.hour);
        const resaService: ResaService = new ResaService();
        resaService.getAll().then((resas) => {
          resas.push(resa);
          resaService.persist(resas);
        });

        this.tournees[this.tournees.indexOf(tour)].dispo = this.tournees[this.tournees.indexOf(tour)].dispo - tour.resa;
        this.tournees[this.tournees.indexOf(tour)].resa = 1;


        // Affiche le toast... Material Mode
        this.snackBar.open('Votre réservation a bien été prise en compte.', 'Undo');

      }
    });
  }
}
