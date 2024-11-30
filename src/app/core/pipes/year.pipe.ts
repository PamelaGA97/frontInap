import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'year',
  standalone: true
})
export class YearPipe implements PipeTransform {

  transform(value: Date | string): number | null {
    if(!value) return null;
    const date = new Date(value);
    return date.getFullYear();
  }

}
