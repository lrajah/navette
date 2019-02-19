import { TourneesService } from './../../shared/services/tournees.service';
import { Component, OnInit } from '@angular/core';
import { TourneeInterface } from 'src/app/shared/interfaces/tournee';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent implements OnInit {
  public tournees: Array<TourneeInterface>;

  constructor(private tourneeService: TourneesService) { }

  ngOnInit(): void {
    this.tourneeService.getTournees().then((tournees) => {
      this.tournees = tournees;
    });
  }

}
