import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CharactersModule } from '../characters/characters.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SizeDetectorComponent } from './components/size-detector/size-detector.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SizeDetectorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CharactersModule
  ],
  exports: [
    NavbarComponent,
    SizeDetectorComponent
  ]
})
export class SharedModule { }
