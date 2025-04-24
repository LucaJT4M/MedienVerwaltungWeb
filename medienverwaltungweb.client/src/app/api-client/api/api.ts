export * from './actor.service';
import { ActorAPIService } from './actor.service';
export * from './book.service';
import { BookAPIService } from './book.service';
export * from './movie.service';
import { MovieAPIService } from './movie.service';
export * from './musicAlbum.service';
import { MusicAlbumAPIService } from './musicAlbum.service';
export * from './song.service';
import { SongAPIService } from './song.service';
export const APIS = [
  ActorAPIService,
  BookAPIService,
  MovieAPIService,
  MusicAlbumAPIService,
  SongAPIService,
];
