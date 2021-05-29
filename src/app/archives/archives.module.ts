import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesPageComponent } from './pages/archives-page/archives-page.component';
import { ArchivesRoutingModule } from './archives-routing.module';



@NgModule({
  declarations: [
    ArchivesPageComponent
  ],
  imports: [
    CommonModule,
    ArchivesRoutingModule
  ]
})
export class ArchivesModule { }
