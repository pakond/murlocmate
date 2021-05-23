import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {

  constructor(private http: HttpClient) { }

  leaderboard3v3() {
    
    const url: string = `${environment.apiUrl}/`;

  }
}

