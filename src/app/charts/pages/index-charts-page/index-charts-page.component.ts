import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartsService } from '../../services/charts.service';

@Component({
  selector: 'app-index-charts-page',
  templateUrl: './index-charts-page.component.html',
  styleUrls: ['./index-charts-page.component.scss']
})
export class IndexChartsPageComponent implements OnInit {

  bracket: string = '3v3';
  specs: any;
  races: any;
  realms: any;
  clases: any;
  total!: number;

  constructor(
    private chartsService: ChartsService,
    private spinner: NgxSpinnerService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    // if (this.bracket !== '2v2' && this.bracket !== '3v3' && this.bracket !== 'rbg') { this.bracket = '3v3' }
    this.chartsService.getCharts(this.bracket)
      .subscribe(resp => {
        this.specs = this.sort_object(resp[0].specs)
        this.clases = this.sort_object(resp[0].clases);
        this.races = this.sort_object(resp[0].races);
        this.realms = this.sort_realms(resp[0].realms);
        this.total = resp[0].total_entries;
        this.titleService.setTitle('Murlocmate | World of Warcraft PvP Hub');
        this.spinner.hide()
      });
  }

  changeBracket(value: string) {
    this.spinner.show()
    this.bracket = value;
    this.chartsService.getCharts(this.bracket)
      .subscribe(resp => {
        this.specs = this.sort_object(resp[0].specs)
        this.clases = this.sort_object(resp[0].clases);
        this.races = this.sort_object(resp[0].races);
        this.realms = this.sort_realms(resp[0].realms);
        this.total = resp[0].total_entries;
        this.spinner.hide()
      });
  }

  sort_object(dict: any): any {
    // Create items array
    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort((first, second) => {
      return second[1] - first[1];
    });

    return items.slice(0, 24);
  }

  sort_realms(dict: any): any {
    let items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });

    items.sort((a, b) => {
      return (b[1]['Horde'] + b[1]['Alliance']) - (a[1]['Horde'] + a[1]['Alliance']);
    });

    return items.slice(0,24);
  }
}
