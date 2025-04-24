import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BookDTO,
  Interpret,
  MovieDTO,
  MusicAlbumDTO,
  SongDTO,
} from '../api-client';
import { MedienVerwaltungWebService } from './medien-verwaltung-web.service';
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
      this.newSong.interpretFullName !== undefined &&
      this.newSong.title !== '' &&
      this.newSong.location !== '' &&
      this.newSong.length > 0 &&
      this.newSong.interpretFullName !== ''
    );
  }

  addSong() {
    this.songService.addSong(this.newSong);
  }
}
