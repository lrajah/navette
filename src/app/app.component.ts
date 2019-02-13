import { TourneeInterface } from './shared/interfaces/tournee';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public title: string = 'Navette Ste - Stex';
  public tournees: Array<TourneeInterface>;
  // tslint:disable-next-line:no-inferrable-types
  public doIShowIt: boolean = true;

  public now: moment.Moment = moment();

  // La tournée sélectionnée par l'utilisateur
  public selectedTour: TourneeInterface;

  public constructor(private toastr: ToastrService) {
    console.log('Constructeur de AppComponent !');
    this.tournees = new Array<TourneeInterface>();
    this.selectedTour = {};
  }

  public ngOnInit() {

    this.tournees.push(
      {
        hour: this.now.clone().hour(8).minute(0),
        am: true,
        isClicked: false,
        dispo: 8
      }
    );
    this.tournees.push(
      {
        hour: this.now.clone().hour(11).minute(0),
        am: true,
        isClicked: false,
        dispo: 8
      }
    );
    this.tournees.push(
      {
        hour: this.now.clone().hour(14).minute(0),
        am: false,
        isClicked: false,
        dispo: 8
      }
    );
    this.tournees.push(
      {
        hour: this.now.clone().hour(17).minute(0),
        am: false,
        isClicked: false,
        dispo: 0
      }
    );
  }

  public doResa(tournee: TourneeInterface): void {
    if (this._canDoResa(tournee)) {
      // La tournée est-elle déjà sélectionnée ?
      if (!tournee.isClicked) {
        // On voudrait pouvoir la sélectionner...
        // Mais y en-a-t-il déjà une dans ce cas ?
        if (!this._checkFor()) {
          tournee.isClicked = !tournee.isClicked;
          this.doIShowIt = false;
          this.selectedTour = tournee;
        }
      } else {
        tournee.isClicked = !tournee.isClicked;
        this.doIShowIt = true;
      }
    } else {
      // Afficher un toast pour avertir l'utilisateur...
      console.log('Désolé, mais on ne peut pas réserver');
      this.toastr.error(
        'Désolé, mais la réservation n\'est pas autorisée pour cette tournée.',
        'Erreur'
        );
    }
  }

  public receiveUpdate($event): void {
    console.log('Mise à jour côté myComponent');
  }

  private _checkFor(): boolean {
    return this.tournees.filter(
      (tournee) => tournee.isClicked
    ).length ? true : false;
  }

  private _canDoResa(tournee): boolean {
    const now: moment.Moment = moment();
    return !(tournee.dispo === 0 || tournee.hour.isBefore(now, 'minute'));
  }
}
