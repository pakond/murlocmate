import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Pipe({
  name: 'realmIcon'
})
export class RealmIconPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): string {
    return this.sharedService.getRealms.filter(realm => realm.slug === value)[0].icon || '';
  }

}
