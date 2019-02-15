import { Component, OnInit } from '@angular/core';
import { ResaService } from 'src/app/shared/services/resa.service';
import { ResaModel } from 'src/app/shared/models/resa-model';

import * as moment from 'moment';
import { ResaSharingService } from 'src/app/shared/services/resa-sharing.service';

@Component({
  selector: 'app-my-resa',
  templateUrl: './my-resa.component.html',
  styleUrls: ['./my-resa.component.scss']
})
export class MyResaComponent implements OnInit {
  private resaService: ResaService;
  public resas: Array<ResaModel>;

  constructor(private resaShareService: ResaSharingService) {
    this.resaService = new ResaService();
  }

  ngOnInit() {
    this.resaService.getAll().then((resas) => {
      this.resas = resas;
    });

    // Observer les messages venant du service
    this.resaShareService.resaShare.subscribe((resa: ResaModel) => {
      console.log('Une nouvelle réservation vient d\'arriver !');
      if (resa !== null) {
        this.resas.push(resa);
      }
    });
  }
}
