import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LeaderResult } from '../interfaces/leaderboards.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {

  constructor(private http: HttpClient) { }

  getLeaderboard(url: string) {

    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<LeaderResult>(url, { headers });
  }
}

