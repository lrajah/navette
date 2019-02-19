import { Component, OnInit } from '@angular/core';
import { ResaService } from './../../shared/services/resa.service';
import { ResaModel } from './../../shared/models/resa-model';

@Component({
  selector: 'app-my-resa',
  templateUrl: './my-resa.component.html',
  styleUrls: ['./my-resa.component.scss']
})
export class MyResaComponent implements OnInit {
  private resaService: ResaService = new ResaService();
  public progress: boolean = true;
  public resas: Array<ResaModel>;

  constructor() { }

  ngOnInit() {
    this.resaService.getAll().then((resas) => {
      console.log('Resas : ' + JSON.stringify(resas));
      this.progress = false;
      this.resas = resas;
    });
  }

}
