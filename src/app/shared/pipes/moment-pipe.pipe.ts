import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentPipe'
})
export class MomentPipe implements PipeTransform {

  transform(date: moment.Moment, format?: string): any {
    if (date) {
      if (format) {
        return date.format(format);
      }
      return date.format('HH:mm');
    }
    return null;
  }

}
