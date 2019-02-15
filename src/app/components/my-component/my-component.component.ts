import { ResaSharingService } from 'src/app/shared/services/resa-sharing.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';
import { ResaModel } from 'src/app/shared/models/resa-model';
import * as moment from 'moment';


@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent implements OnInit {
  @Input() tour: TourneeInterface ;
  @Output() tourEvent: EventEmitter<TourneeInterface> = new EventEmitter<TourneeInterface>();

  // tslint:disable-next-line:no-inferrable-types
  public nbPlaces: number = 1;
  // tslint:disable-next-line:no-inferrable-types
  public isMini: boolean = true;

  // tslint:disable-next-line:no-inferrable-types
  public isMaxi: boolean = false;

  constructor(private resaShareService: ResaSharingService) { }

  ngOnInit() {
  }

  public increment(): void {
    this.nbPlaces++;

    this.isMini = false;

    if (this.nbPlaces === this.tour.dispo) {
      this.isMaxi = true;
    }
  }

  public decrement(): void {
    this.nbPlaces--;

    this.isMaxi = false;

    if (this.nbPlaces === 1) {
      this.isMini = true;
    }
  }

  public sendIt(): void {
    this.tour.dispo = this.tour.dispo - this.nbPlaces;
    this.tourEvent.emit(this.tour);
    this.nbPlaces = 1;

    // Notifier les observateurs...
    const resa: ResaModel = (new ResaModel())
      .deserialize({
        dateResa: moment(),
        tourDate: moment(this.tour.hour),
        places: this.nbPlaces
      });
    this.resaShareService.sendResa(resa);
  }
}
