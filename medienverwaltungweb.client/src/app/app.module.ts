import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddMediaComponent } from './add-media/add-media.component';
import { SongAddFormComponent } from './add-media/song-add-form/song-add-form.component';
import { InterpretFormComponent } from './add-media/interpret-form/interpret-form.component';
import { MovieAddFormComponent } from './add-media/movie-add-form/movie-add-form.component';
import { ActorAddFormComponent } from './add-media/actor-add-form/actor-add-form.component';
import { MusicAlbumAddFormComponent } from './add-media/musicAlbum-add-form/musicAlbum-add-form.component';
import { CommonModule } from '@angular/common';
import { BookAddFormComponent } from './add-media/book-add-form/book-add-form.component';
import { BookComponent } from './book/book.component';
import {ToastrModule} from "ngx-toastr"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

@NgModule({
  declarations: [
    AppComponent,
    AddMediaComponent,
    MovieAddFormComponent,
    ActorAddFormComponent,
    MusicAlbumAddFormComponent,
    BookAddFormComponent,
    SongAddFormComponent,
    BookComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarComponent,
    FormsModule,
    InterpretFormComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
