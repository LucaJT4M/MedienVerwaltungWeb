import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SongDTO } from '../api-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterpretService } from './interpretService.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private url: string = environment.apiBaseUrl;
  songList: SongDTO[] = [];
  maxPages: number = 1;
  pageSize: number = 10;
  isLastPage: boolean = false

  constructor(private http: HttpClient, private interpretService: InterpretService) {
    this.getSongPageCount()
  }

  getSongPage(page: number): Observable<SongDTO[]> {
    return this.http.get<SongDTO[]>(this.url + `/Song/SongPagination/${page},${this.pageSize}`)
  }

  getSongPageCount(): Observable<number> {
    return this.http.get<number>(this.url + `/Song/GetPageCount/${this.pageSize}`)
  }

  getInterpretNames(): Observable<string[]> {
    return this.interpretService.getInterpretFullNames()
  }

  searchSongByTitle(searchTerm: string) {
    this.http
      .get(this.url + `/Song/SearchSongsByTitle/${searchTerm},${this.pageSize}`)
      .subscribe({
        next: (res) => {
          this.songList = res as SongDTO[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteSong(songId: number) {
    return this.http.delete(this.url + `/Song/${songId}`)
  }

  saveSong(toUpdateSong: SongDTO) {
    return this.http.put(this.url + `/Song/${toUpdateSong.id}`, toUpdateSong)
  }

  addSong(toAddSong: SongDTO) {
    return this.http.post(this.url + `/Song`, toAddSong)
  }

  isPageLastPage(page: number) {
    this.http.get(this.url + `/Song/IsPageLastPage/${page},${this.pageSize}`).subscribe({
      next: (res) => {
        this.isLastPage = res as boolean
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
