import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaderResult } from '../interfaces/leaderboards.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {

  constructor(private http: HttpClient) { }

  getLeaderboard(bracket: string, season: number, region: string, page: number) {

    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    let url: string;

    if (bracket === '2v2') {  url = `${environment.apiUrl}/pvp-entry-2v2/`; }
    if (bracket === '3v3') {  url = `${environment.apiUrl}/pvp-entry-3v3/`; }
    if (bracket === 'rbg') {  url = `${environment.apiUrl}/pvp-entry-rbg/`; }

    const params = new HttpParams()
      .set('page', page)
      .set('season__sid',  season)
      .set('region__name', region)

    return this.http.get<LeaderResult>(url!, { params, headers });
  }
}

