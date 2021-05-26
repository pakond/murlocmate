import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    SharedModule,
    LeaderboardsModule,
    CharactersModule
  ],
  providers: [
    // Cambiar locale
    // { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
