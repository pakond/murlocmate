import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cutoffs-page',
  templateUrl: './cutoffs-page.component.html',
})
export class CutoffsPageComponent implements OnInit {

  environment =  environment;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('MurlocMate | WoW PvP Current Cutoffs');
  }

}
