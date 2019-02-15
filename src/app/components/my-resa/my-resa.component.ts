import { Component, OnInit } from '@angular/core';
import { ResaService } from 'src/app/shared/services/resa.service';
import { ResaModel } from 'src/app/shared/models/resa-model';

import * as moment from 'moment';

@Component({
  selector: 'app-my-resa',
  templateUrl: './my-resa.component.html',
  styleUrls: ['./my-resa.component.scss']
})
export class MyResaComponent implements OnInit {
  private resaService: ResaService;
  public resas: Array<ResaModel>;

  constructor() {
    this.resaService = new ResaService();
  }

  ngOnInit() {
    this.resaService.getAll().then((resas) => {
      this.resas = resas;
    });
  }
}
