import { DaoResa } from './shared/models/dao-resa';
import { TourneeInterface } from './shared/interfaces/tournee';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ResaModel } from './shared/models/resa-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public title: string = 'Navette Ste - Stex';

  public constructor(
    private toastr: ToastrService
  ) {
    console.log('Constructeur de AppComponent !');
  }

  public ngOnInit() {
  }
}
