import { Component, OnInit, Input, Output } from '@angular/core';
import { TourneeInterface } from './../../shared/interfaces/tournee';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.scss']
})
export class MyComponentComponent implements OnInit {
  @Input() tour: TourneeInterface ;
  @Output() tourEvent: EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
