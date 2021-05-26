import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Pipe({
  name: 'factionIcon'
})
export class FactionIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): string {
    return this.sharedService.factions.filter(faction => faction.name === value)[0].icon || '';
  }

}
