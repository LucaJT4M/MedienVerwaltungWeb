import { Component } from '@angular/core';
import { MediaType } from '../api-client/model/media';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMediaService } from '../shared/addMedia.service';
import { ToasterService } from '../shared/toaster.service';
import { InterpretService } from '../shared/interpretService.service';
import { Interpret } from '../api-client';

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
  addedInterpret: Interpret = {}
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

  _addForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    location: new FormControl("")
  })

  constructor(public addService: AddMediaService, private toastServ: ToasterService, private interprService: InterpretService) { }

  changedMediaType(event: Event) {
    const type = (event.target as HTMLInputElement).value;
    this.mediaTypeOutput = type;
    this.updateView(this.mediaTypeOutput);
  }

  handleSubmit() {
    if (this.mediaTypeOutput === '0') {
      // Song ist ausgewählt
      this.addService.newSong.title = this.addForm.value.title;
      this.addService.newSong.location = this.addForm.value.location;
      this.addService.newSong.interpretFullName =
        this.addService.newInterpret.fullName;

      this.addForm = this.songAddForm
      this.addForm.reset()

      if (this.addService.isSongComplete()) {
        this.addSong()
        console.log(this.addService.newInterpret)
      } else {
        console.log("Form incomplete")
        this.toastServ.error("Bitte alle Felder beim Interpreten ausfüllen!", "Song wurde nicht hinzugefügt!")
        this.oDelay(4000);
      }
    }
  }

  updateView(mediaTypeId: string) {
    if (mediaTypeId === '0') {
      // Song ist ausgewählt
      this.addForm = this.songAddForm
      this._addForm = this.songAddForm
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
 
  isSubmitValid(): boolean {
    if (this.addForm.valid) {
      return false
    }

    return true;
  }

  async oDelay(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms));
    return window.location.reload();
  }

  addSong() {
    if (this.interprService.interpretAlreadyExists(this.addService.newInterpret)) {
      // Wenn Interpret noch nicht existiert
      console.log("Interpret doesn't exist")
      this.interprService.addNewInterpret(this.addService.newInterpret).subscribe({
        next: (res) => {
          this.addedInterpret = res as Interpret
          this.addService.newSong.interpretId = this.addedInterpret.id

          this.addService.addSong().subscribe({
            next: () => {
              window.location.reload();
              this.toastServ.success("Song wurde hinzugefügt!");
            },
            error: (err) => {
              this.toastServ.error(err, "Song wurde nicht hinzugefügt!")
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log("Interpret exists")
      this.addService.newSong.interpretId = this.addService.newInterpret.id
      this.addService.newSong.interpretFullName = this.addService.newInterpret.fullName

      this.addService.addSong().subscribe({
        next: () => {
          window.location.reload();
          this.toastServ.success("Song wurde hinzugefügt!");
        },
        error: (err) => {
          this.toastServ.error(err, "Song wurde nicht hinzugefügt!")
          console.log(err);
        },
      });
    }
  }
}
