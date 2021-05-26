import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Pipe({
  name: 'regionIcon'
})
export class RegionIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): string {
    return this.sharedService.regions.filter(region => region.name === value)[0].icon;
  }

}
