import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaderResult } from 'src/app/leaderboards/interfaces/leaderboards.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  getCharts(bracket: string) {

    let url: string = '';
    if (bracket === '2v2') {
      url = `${environment.apiUrl}/charts-2v2/`;
    } else if (bracket === '3v3') {
      url = `${environment.apiUrl}/charts-3v3/`;
    } else if (bracket === 'rbg') {
      url = `${environment.apiUrl}/charts-rbg/`;
    }

    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<LeaderResult[]>(url, { headers });
  }
}
