import { Component } from '@angular/core';
import { MediaType } from '../api-client/model/media';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMediaService } from '../shared/addMedia.service';

@Component({
  selector: 'app-add-media',
  standalone: false,
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css',
})
export class AddMediaComponent {
  mediaType: MediaType[] = [
    {
      id: 0,
      media: 'Song',
    },
    {
      id: 1,
      media: 'Buch',
    },
    {
      id: 2,
      media: 'Film',
    },
    {
      id: 3,
      media: 'Musikalbum',
    },
  ];
  newMediaType: MediaType = {};
  // testSong: SongDTO = {
  //   id: 1,
  //   interpretFullName: 'Keine Ahnung',
  //   length: 5,
  //   location: 'Kein Ahnung Location',
  //   title: 'TestSongTitel',
  // };
  mediaTypeOutput: string | any = '';
  songAddFormIsShown: boolean = false;
  movieAddFormIsShown: boolean = false;
  bookAddFormIsShown: boolean = false;
  musicAlbumAddFormIsShown: boolean = false;
  interpretAddFormIsShown: boolean = false;

  addForm: FormGroup | any = new FormGroup({
    title: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required)
  })

  songAddForm = new FormGroup({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    songLength: new FormControl(1, Validators.required),
    interpretFullName: new FormControl("", Validators.required)
  })

  _addForm: FormGroup | any

  constructor(public addService: AddMediaService) { }

  changedMediaType(event: Event) {
    const type = (event.target as HTMLInputElement).value;
    this.mediaTypeOutput = type;
    this.updateView(this.mediaTypeOutput);
  }

  handleSubmit() {
    this._addForm = this.addForm
    // this.addForm.reset();

    if (this.mediaTypeOutput === '0') {
      // Song ist ausgewählt
      this.addService.newSong.title = this.addForm.value.title;
      this.addService.newSong.location = this.addForm.value.location;
      this.addService.newSong.interpretFullName =
        this.addService.newInterpret.fullName;

      if (this.addService.isSongComplete()) {
        this.addService.addSong();
      } else {
        console.log("Form incomplete")
      }
    }
  }

  updateView(mediaTypeId: string) {
    if (mediaTypeId === '0') {
      // Song ist ausgewählt
      this.addForm = this.songAddForm
      this.songAddFormIsShown = true;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = true;
    } else if (mediaTypeId === '1') {
      // Buch ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = true;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = true;
    } else if (mediaTypeId === '2') {
      // Film ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = true;
      this.interpretAddFormIsShown = false;
    } else if (mediaTypeId === '3') {
      // Musikalbum ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = true;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = true;
    } else {
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = false;
    }
  }
}
