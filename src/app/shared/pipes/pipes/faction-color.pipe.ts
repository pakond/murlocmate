import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Pipe({
  name: 'factionColor'
})
export class FactionColorPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): unknown {
    const race = this.sharedService.getRaces.filter(race => race.name === value)[0] || '';
    if (race.faction.name === 'Horde') {
      return '#e93a3a';
    } else if (race.faction.name === 'Alliance') {
      return '#4accff';
    } else {
      return 'white';
    }
  }

}
