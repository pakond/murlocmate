import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cutoffs-page',
  templateUrl: './cutoffs-page.component.html',
})
export class CutoffsPageComponent implements OnInit {

  environment =  environment;

  constructor() { }

  ngOnInit(): void {
    
  }

}
