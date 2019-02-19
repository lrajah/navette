import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { TourneeInterface } from '../interfaces/tournee';
import * as moment from 'moment';

@Directive({
  selector: '[appResaAuto]'
})
export class ResaAutoDirective implements OnInit {
  @Input('appResaAuto') tournee: TourneeInterface;

  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit() {
    const today: moment.Moment = moment();
    if (this.tournee.hour.isBefore(today, 'minutes') || this.tournee.dispo === 0) {
      this.render.addClass(this.element.nativeElement, 'disabled');
      this.render.setAttribute(this.element, 'disabled', 'disabled');
      this.render.setProperty(this.element, 'disabled', true);
    }
  }
}
