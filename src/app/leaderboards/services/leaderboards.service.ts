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

    let bracketId: string;
    if (bracket === '2v2') { bracketId = 'ARENA_2v2' }
    if (bracket === '3v3') { bracketId = 'ARENA_3v3' }
    if (bracket === 'rbg') { bracketId = 'BATTLEGROUNDS' }

    const url = `${environment.apiUrl}/pvp-entry/`;
    const params = new HttpParams()
      .set('bracket__pvp_type', bracketId!)
      .set('season__sid',  season)
      .set('region__name', region)
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<LeaderResult>(url, { params, headers });
  }
}

