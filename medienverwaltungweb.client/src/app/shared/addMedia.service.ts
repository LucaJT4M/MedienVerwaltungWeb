import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BookDTO,
  Interpret,
  MovieDTO,
  MusicAlbumDTO,
  SongDTO,
} from '../api-client';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root',
})
export class AddMediaService {
  newInterpret: Interpret = {};
  newMovie: MovieDTO = {};
  newBook: BookDTO = {};
  newSong: SongDTO = {};
  newMusicAlbum: MusicAlbumDTO = {};

  constructor(private http: HttpClient, private songService: SongService) {}

  isSongComplete(): boolean {
    return (
      this.newSong.title !== undefined &&
      this.newSong.location !== undefined &&
      this.newSong.length !== undefined &&
      this.newInterpret.birthDate !== "" &&
      this.newInterpret.firstName !== "" &&
      this.newInterpret.name !== "" &&
      this.newInterpret.gender !== ""
    );
  }

  addSong() {
    this.songService.addSong(this.newSong).subscribe({
      next: (res) => {
        window.location.reload();
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
    });;
  }
}
