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
  interpretExists: boolean = false

  constructor(private songService: SongService) {}

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

  isBookComplete(): boolean {
    return (
      this.newBook.title !== undefined &&
      this.newBook.location !== undefined &&
      this.newBook.description !== "" &&
      this.newBook.interpretFullName !== "" &&
      this.newBook.pageCount !== undefined &&
      this.newBook.releaseYear !== undefined
    )
  }

  addSong() {
    return this.songService.addSong(this.newSong);
  }
}