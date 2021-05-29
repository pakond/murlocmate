import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Pipe({
  name: 'specIcon'
})
export class SpecIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string, ...args: unknown[]): string {
    if (args[0] === 'Druid' && value === 'Restoration') {
      return this.sharedService.specs.filter(spec => spec.id === 13)[0].icon || '';
    } else if (args[0] === 'Shaman' && value === 'Restoration') {
      return this.sharedService.specs.filter(spec => spec.id === 28)[0].icon || '';
    } else if (args[0] === 'Paladin' && value === 'Holy') {
      return this.sharedService.specs.filter(spec => spec.id === 4)[0].icon || '';
    } else if (args[0] === 'Priest' && value === 'Holy') {
      return this.sharedService.specs.filter(spec => spec.id === 21)[0].icon || '';
    } else if (args[0] === 'Death Knight' && value === 'Frost') {
      return this.sharedService.specs.filter(spec => spec.id === 15)[0].icon || '';
    } else if (args[0] === 'Mage' && value === 'Frost') {
      return this.sharedService.specs.filter(spec => spec.id === 3)[0].icon || '';
    } 
    return this.sharedService.specs.filter(spec => spec.name === value)[0].icon || '';
  }

}
