import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Actor, MovieDTO } from '../api-client';

@Injectable({
  providedIn: 'root',
})
export class MedienVerwaltungWebService {
  private url: string = environment.apiBaseUrl;
  actorList: Actor[] = [];
  newMovie: MovieDTO = {};

  constructor(private http: HttpClient) {
    this.getActors();
  }

  getActors() {
    this.http.get(this.url + '/Actor').subscribe({
      next: (res) => {
        this.actorList = res as Actor[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
