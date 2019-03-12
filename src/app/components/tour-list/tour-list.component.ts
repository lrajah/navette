import { DaoResa } from './../../shared/models/dao-resa';
import { ResaModel } from './../../shared/models/resa-model';

import { TourneesService } from './../../shared/services/tournees.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { PaymentDialogComponent } from './../payment-dialog/payment-dialog.component';

import * as moment from 'moment';
import { ResaService } from 'src/app/shared/services/resa.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit, OnDestroy {
  public tournees: Array<TourneeInterface>;
  // tslint:disable-next-line:no-inferrable-types
  public progress: boolean = true;
  public dayShowed:moment.Moment=moment();
  public showPrev:boolean=false;
  private tourSubscription:Subscription;
  private resaTmp:any;
  constructor(
    private tourneeService: TourneesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.tourneeService.getTournees().then((tournees) => {
    //   this.tournees = tournees;
    //   this.progress = false;
    // });

    this.apiCall();

  }
  ngOnDestroy(){
    this.tourSubscription.unsubscribe();
  }

  private apiCall(date:moment.Moment=null) {
    this.tourSubscription=this.tourneeService.getRemoteTournees(date).subscribe((tournees) => {
      console.log('Hola les tournees : ' + tournees);
      this.tournees = tournees.map((tour) => {
        console.log('Hola les tournees : ' + tour.placeDispo);
        const time: moment.Moment = moment(tour.horaire, "YYYY-MM-DD HH:mm");
        const tournee: TourneeInterface = {
          hour: time,
          dispo: Number(tour.placeDispo),
          resa: 1
        };
        return tournee;
      });
    });
  }

  private apiCallChoose(tour: TourneeInterface) {
    console.log('Je rentre dans apichoose'+ tour.hour + ' ' + tour.resa);
    const resp=this.tourneeService.chooseRemoteTournees(tour.hour,tour.resa).subscribe(resp => {
      this.resaTmp=resp;
      console.log('http status'+ resp.status);
      console.log(resp.body);
      if(resp.status==200) this.openPaymentDialog(tour);
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
    //this.apiCallChoose(tour.hour,tour.resa);
    
    console.log('icicic  ' + this.resaTmp);

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
        const daoResa: DaoResa = new DaoResa(resa, this.tourneeService);
        daoResa.add(this.resaTmp.body);

        this.tournees[this.tournees.indexOf(tour)].dispo = this.tournees[this.tournees.indexOf(tour)].dispo - tour.resa;
        this.tournees[this.tournees.indexOf(tour)].resa = 1;


        // Affiche le toast... Material Mode
        this.snackBar.open('Votre réservation a bien été prise en compte.', 'Undo');

      }
    });
  }
  public nextDay(){

    

    this.tourneeService.getRemoteTournees(this.dayShowed.add(1,'day')).subscribe((tournees) => { 
      console.log('Hola les tournees : ' + tournees);
      this.tournees=tournees.map((tour)=>{
        const time:moment.Moment=moment(tour.horaire, "YYYY-MM-DD HH:mm")
        const tournee:TourneeInterface={
          hour: time,
          dispo: Number(tour.placeDispo),
          resa:1
        }
        return tournee;
      });
      this.dayShowed=this.tournees[0].hour;
      this.showPrev=true;
    });
    //console.log(nextDay.format("YYYY-MM-DD"));
    //this.dayShowed=nextDay;
    console.log(this.dayShowed.format("YYYY-MM-DD"));

  }
  public previousDay(){
    

    this.tourneeService.getRemoteTournees(this.dayShowed.add(-1,'day')).subscribe((tournees) => { 
      console.log('Hola les tournees : ' + tournees);
      this.tournees=tournees.map((tour)=>{
        const time:moment.Moment=moment(tour.horaire, "YYYY-MM-DD HH:mm")
        const tournee:TourneeInterface={
          hour: time,
          dispo: Number(tour.placeDispo),
          resa:1
        }
        return tournee;
      });
      this.dayShowed=this.tournees[0].hour;
      const tmp=this.dayShowed.clone();
      this.previousIsValid(tmp.add(-1,'day'));
      
    });

    

  }
  public previousIsValid(previous:moment.Moment){
const today= moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY");
const prev= moment(previous.format("DD-MM-YYYY"), "DD-MM-YYYY");

    if(prev.isBefore(today)){
      this.showPrev=false;
    }
  }
}
