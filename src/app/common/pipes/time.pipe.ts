import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(_value: number | string): string {
    const value = +_value;

    if (value || !isNaN(value)) {
      const minutes = Math.round(Math.floor(value / 60));
      const seconds = Math.round(Math.floor(value - minutes * 60));

      return `${+minutes}:${+seconds < 10 ? '0' : ''}${+seconds}`;
    } else {
      return '';
    }
  }
}
