import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassColorPipe } from './pipes/class-color.pipe';
import { RegionIconPipe } from './pipes/region-icon.pipe';
import { ClassIconPipe } from './pipes/class-icon.pipe';
import { FactionIconPipe } from './pipes/faction-icon.pipe';

@NgModule({
  declarations: [
    ClassColorPipe,
    RegionIconPipe,
    ClassIconPipe,
    FactionIconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClassColorPipe,
    RegionIconPipe,
    ClassIconPipe,
    FactionIconPipe
  ]
})
export class PipesModule { }
