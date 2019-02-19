import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValues'
})
export class GetValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
