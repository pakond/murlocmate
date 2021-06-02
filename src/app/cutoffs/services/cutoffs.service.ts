import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SeasonResults } from '../interfaces/cutoffs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CutoffsService {

  constructor(private http: HttpClient) { }

  getCutoff(season: number) {
    const url = `${environment.apiUrl}/pvp-season/${season}/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<SeasonResults>(url, { headers });
  }
}
