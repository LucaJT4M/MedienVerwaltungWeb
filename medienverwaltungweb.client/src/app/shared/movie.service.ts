import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDTO } from '../api-client';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url: string = environment.apiBaseUrl
  pageSize: number = environment.pageSize
  isLastPage: boolean = false

  constructor(private http: HttpClient) { }

  getMoviePage(page: number): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(this.url + `/Movie/MoviePagination/${page},${this.pageSize}`)
  }

  getMoviePageCount(): Observable<number> { 
    return this.http.get<number>(this.url + `/Movie/GetPageCount/${this.pageSize}`)
  }

  deleteMovie(movieId: number) {
    return this.http.delete(this.url + `/Movie/${movieId}`)
  }

  saveMovie(toUpdateMovie: MovieDTO) {
    return this.http.put(this.url + `/Movie/${toUpdateMovie.id}`, toUpdateMovie)
  }

  addMovie(toAddMovie: MovieDTO) {
    return this.http.post(this.url + `/Movie`, toAddMovie)
  }

  isPageLastPage(page: number) {
    this.http.get(this.url + `/Movie/IsPageLastPage/${page},${this.pageSize}`).subscribe({
      next: (res) => {
        this.isLastPage = res as boolean
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
