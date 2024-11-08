import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: [number, string?]): string {
    if (value) {
      const limit: number = args.length > 0 ? +args[0] : 20;
      const trail: string = args.length > 1 ? args[1] : '...';
      return value.length > limit ? value.substring(0, limit) + trail : value;
    } else {
      return '';
    }
  }
}
