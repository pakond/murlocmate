import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Pipe({
  name: 'classColor'
})
export class ClassColorPipe implements PipeTransform {

  constructor(private sharedService: SharedService) {}

  transform(value: string): string {
    return this.sharedService.getClases.filter(wClass => wClass.name === value)[0].color || '';
  }

}
