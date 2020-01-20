import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCountry'
})
export class NameCountryPipe implements PipeTransform {

  index: number;

  transform(arrCountries: any[], country: string): string {
    this.index = arrCountries.findIndex(c => c.alpha2Code === country);
    return arrCountries[this.index].name;
  }

}
