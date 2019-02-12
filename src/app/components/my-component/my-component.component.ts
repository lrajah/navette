import { Component, OnInit, Input } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent implements OnInit {
  @Input() tour: TourneeInterface ;

  constructor() { }

  ngOnInit() {
  }

}
