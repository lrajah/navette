
import { TourneesService } from './../../shared/services/tournees.service';
import { Component, Inject, OnInit } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaymentDialogComponent } from './../payment-dialog/payment-dialog.component';

import * as moment from 'moment';

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
    private dialog: MatDialog
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
      width: '250px',
      data: tour
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
