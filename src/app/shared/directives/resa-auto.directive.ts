import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { TourneeInterface } from '../interfaces/tournee';
import * as moment from 'moment';

@Directive({
  selector: '[appResaAuto]'
})
export class ResaAutoDirective implements OnInit {
  @Input('appResaAuto') tournee: TourneeInterface;

  // tslint:disable-next-line:no-inferrable-types
  private backgroundColor: string = '#eaeaea';

  constructor(private element: ElementRef, private render: Renderer2) {}

  ngOnInit() {
    const today: moment.Moment = moment();
    if (this.tournee.hour.isBefore(today, 'minutes')) {
      this.render.setStyle(this.element.nativeElement, 'background-color', this.backgroundColor);
      this.render.addClass(this.element.nativeElement, 'disabled');
    } else {
      if (this.tournee.dispo === 0) {
        this.render.setStyle(this.element.nativeElement, 'background-color', this.backgroundColor);
        this.render.addClass(this.element.nativeElement, 'disabled');
      }
    }
  }
}
