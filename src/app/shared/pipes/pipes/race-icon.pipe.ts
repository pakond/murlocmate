import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Pipe({
  name: 'raceIcon'
})
export class RaceIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string, ...args: unknown[]): string {
    if (args[0] === 'Female') {
      return this.sharedService.races.filter(race => race.name === value)[0].icon_female || '';
    } else {
      return this.sharedService.races.filter(race => race.name === value)[0].icon_male || '';
    }
  }

}
