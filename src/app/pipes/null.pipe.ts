import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null',
})
export class NullPipe implements PipeTransform {
  // tslint:disable-next-line: no-any
  public transform(value: any): string {
    return value === null || value === undefined || value === '' ? '-' : value;
  }
}
