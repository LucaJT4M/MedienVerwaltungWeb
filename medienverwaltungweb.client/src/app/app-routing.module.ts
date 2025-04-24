import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongComponent } from './song/song.component';
import { BookComponent } from './book/book.component';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { MusicAlbumComponent } from './music-album/music-album.component';
import { AddMediaComponent } from './add-media/add-media.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'song', component: SongComponent },
  { path: 'book', component: BookComponent },
  { path: 'actor', component: ActorComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'music-album', component: MusicAlbumComponent },
  { path: 'add-media', component: AddMediaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink, RouterLinkActive],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
