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

  private dispoBefore: number;

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
        dispo: 5
      }
    );
    this.tournees.push(
      {
        hour: this.now.clone().hour(17).minute(0),
        am: false,
        isClicked: false,
        dispo: 8
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
          this.dispoBefore = tournee.dispo;
        }
      } else {
        tournee.isClicked = !tournee.isClicked;
        this.doIShowIt = true;
      }
    } else {
      // Afficher un toast pour avertir l'utilisateur...
      console.log('Désolé, mais on ne peut pas réserver');
      this.toastr.error(
        'Désolé, mais la réservation n\'est pas autorisée pour la tournée de ' + tournee.hour.format('HH:mm'),
        'Erreur'
        );
    }
  }

  public receiveUpdate($event): void {
    this.doIShowIt = true;
    $event.isClicked = false;
    const places: number = this.dispoBefore - $event.dispo;
    // Un petit toast pour la route ?
    this.toastr.success(
      'Votre réservation de ' + places + ' places a bien été prise en compte.',
      'Merci'
    );
    // TODO : persister la réservation...
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
