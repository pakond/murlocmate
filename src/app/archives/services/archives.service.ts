import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SeasonsResults } from '../interfaces/archives.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  constructor(private http: HttpClient) { }

  getSeasons() {

    const url = `${environment.apiUrl}/pvp-season/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<SeasonsResults[]>(url, { headers });
  }
}
