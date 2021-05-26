import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Pipe({
  name: 'classIcon'
})
export class ClassIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): string {
    return this.sharedService.clases.filter(wowClass => wowClass.name === value)[0].icon || '';
  }

}
