import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SearchCharacters, Character } from '../interfaces/characters.interfaces';
import { SharedService } from '../../shared/services/shared.service';
import { Realm } from '../../shared/interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  searchCharacters(term: string): Observable<SearchCharacters[]> {

    const url = `${environment.apiUrl}/character/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)
    const params = new HttpParams().set('search', term)

    return this.http.get<SearchCharacters[]>(url, { headers, params });

  }

  getCharacter(name: string, realm: string, region: string) {

    const url = `${environment.apiUrl}/character/${region}/${realm}/${name}/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<Character>(url, { headers });
  }

  postCharacter(name: string, realm: string, region: string) {

    const url = `${environment.apiUrl}/character/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)
    const body = new HttpParams()
      .set('name', name)
      .set('realm', this.sharedService.getRealms.filter(item => item.slug === realm)[0].id)
      .set('region', this.sharedService.getRegions.filter(item => item.name === region)[0].id)

    return this.http.post<any>(url, body, { headers });
  }

  getRealm(id: number) {
    const url = `${environment.apiUrl}/realm/${id}/`;
    const headers = new HttpHeaders().set('X-Api-Key', environment.apiKey)

    return this.http.get<Realm>(url, { headers });
  }
}
