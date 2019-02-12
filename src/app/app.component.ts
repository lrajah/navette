import { TourneeInterface } from './shared/interfaces/tournee';
import { Component, OnInit } from '@angular/core';
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

  public constructor() {
    console.log('Constructeur de AppComponent !');
    this.tournees = new Array<TourneeInterface>();
    this.selectedTour = {};
  }

  public ngOnInit() {
    console.log('Initialisation de AppComponent');

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
    console.log('On veut réserver pour la tournée de ' + tournee.hour);
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
  }

  private _checkFor(): boolean {
    return this.tournees.filter(
      (tournee) => tournee.isClicked
    ).length ? true : false;
  }
}
