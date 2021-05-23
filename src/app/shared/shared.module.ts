import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CharactersModule } from '../characters/characters.module';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CharactersModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
