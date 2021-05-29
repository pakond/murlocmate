import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassColorPipe } from './pipes/class-color.pipe';
import { RegionIconPipe } from './pipes/region-icon.pipe';
import { ClassIconPipe } from './pipes/class-icon.pipe';
import { FactionIconPipe } from './pipes/faction-icon.pipe';
import { RaceIconPipe } from './pipes/race-icon.pipe';
import { SpecIconPipe } from './pipes/spec-icon.pipe';
import { RealmIconPipe } from './pipes/realm-icon.pipe';

@NgModule({
  declarations: [
    ClassColorPipe,
    RegionIconPipe,
    ClassIconPipe,
    FactionIconPipe,
    RaceIconPipe,
    SpecIconPipe,
    RealmIconPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClassColorPipe,
    RegionIconPipe,
    ClassIconPipe,
    FactionIconPipe,
    RaceIconPipe,
    SpecIconPipe,
    RealmIconPipe
  ]
})
export class PipesModule { }
