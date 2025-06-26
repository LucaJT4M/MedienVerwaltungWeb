import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Actor, MovieDTO, SongDTO } from '../api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedienVerwaltungWebService {
  private url: string = environment.apiBaseUrl;
  // actorList: Actor[] = [];
  newMovie: MovieDTO = {};

  constructor(private http: HttpClient) {
    this.getActors();
  }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.url + '/Actor')
  }

  getSongs(): Observable<SongDTO[]> {
    return this.http.get<SongDTO[]>(this.url + "/SongDTO")
  }
}

// .subscribe({
//       next: (res) => {
//         this.actorList = res as Actor[];
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });