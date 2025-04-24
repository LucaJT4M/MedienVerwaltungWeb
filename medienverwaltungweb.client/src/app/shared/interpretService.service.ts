import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Interpret } from '../api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterpretService {
  private url: string = environment.apiBaseUrl;
  interpretList: Interpret[] = [];

  constructor(private http: HttpClient) {}

  getInterprets() {
    this.http.get(this.url + '/Interpret').subscribe({
      next: (res) => {
        this.interpretList = res as Interpret[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getInterpretById(id: number): Observable<Interpret> {
    return this.http.get<Interpret>(this.url + `/Interpret/${id}`);
  }

  addNewInterpret(interpret: Interpret) {
    this.http.post(this.url + '/Interpret', interpret).subscribe({
      next: (res) => {
        this.interpretList.push(res as Interpret);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
