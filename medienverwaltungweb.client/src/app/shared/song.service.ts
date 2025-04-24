import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SongDTO } from '../api-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private url: string = environment.apiBaseUrl;
  songList: SongDTO[] = [];
  maxPages: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient) {}

  getSongPage(page: number) {
    this.http
      .get(this.url + `/Song/SongPagination/${page},${this.pageSize}`)
      .subscribe({
        next: (res) => {
          this.songList = res as SongDTO[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getSongPageCount() {
    this.http.get(this.url + `/Song/GetPageCount/${this.pageSize}`).subscribe({
      next: (res) => {
        this.maxPages = res as number;
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  deleteSong(songId: number, currentPage: number) {
    this.http.delete(this.url + `/Song/${songId}`).subscribe({
      next: (res) => {
        this.getSongPage(currentPage);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveSong(toUpdateSong: SongDTO, currentPage: number) {
    this.http
      .put(this.url + `/Song/${toUpdateSong.id}`, toUpdateSong)
      .subscribe({
        next: () => {
          this.getSongPage(currentPage);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addSong(toAddSong: SongDTO) {
    this.http.post(this.url + `/Song`, toAddSong).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }
}
