import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSpinnerModule } from "ngx-spinner";

import { CharactersModule } from './characters/characters.module';
import { LeaderboardsModule } from './leaderboards/leaderboards.module';
import { SharedModule } from './shared/shared.module';

// Cambiar locale
// import localeEs from '@angular/common/locales/es';
// import { registerLocaleData } from '@angular/common'
// registerLocaleData(localeEs)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    LeaderboardsModule,
    CharactersModule
  ],
  providers: [
    // Cambiar locale
    // { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
