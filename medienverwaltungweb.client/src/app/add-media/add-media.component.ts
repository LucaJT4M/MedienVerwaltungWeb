import { Component, OnInit } from '@angular/core';
import { AddItems } from '../api-client/model/addItem';
import { AddMediaService } from '../shared/addMedia.service';
import { ToasterService } from '../shared/toaster.service';
import { InterpretService } from '../shared/interpretService.service';
import { Interpret } from '../api-client';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-media',
  standalone: false,
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css',
})
export class AddMediaComponent implements OnInit {
  addItems: AddItems[] = [
    {
      id: 4,
      item: "Interpret"
    },
    {
      id: 0,
      item: 'Song',
    },
    {
      id: 1,
      item: 'Buch',
    },
    {
      id: 2,
      item: 'Film',
    },
    {
      id: 3,
      item: 'Musikalbum',
    },
    
  ];
  newItemType: AddItems = {};
  addedInterpret: Interpret = {}
  mediaTypeOutput: string | any = '';
  songAddFormIsShown: boolean = false;
  movieAddFormIsShown: boolean = false;
  bookAddFormIsShown: boolean = false;
  musicAlbumAddFormIsShown: boolean = false;
  interpretAddFormIsShown: boolean = false;
  titleAndLocationAreShown: boolean = false;

  addForm: FormGroup | any = new FormGroup({
    title: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
  });

  songAddForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
    songLength: new FormControl("", Validators.maxLength(99))
  })

  interpretAddForm: FormGroup = new FormGroup({
    firstName: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    birthDate: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
  })

  ngOnInit(): void {}

  constructor(public addService: AddMediaService, private toastServ: ToasterService, private interprService: InterpretService) { }

  changedMediaType(event: Event) {
    const type = (event.target as HTMLInputElement).value;
    this.mediaTypeOutput = type;
    this.updateView(this.mediaTypeOutput);
  }

  handleSubmit() {
    if (this.mediaTypeOutput === '4') {
      // Song ist ausgewählt
      
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
      this.interpretAddFormIsShown = false;
      this.titleAndLocationAreShown = true
    } else if (mediaTypeId === '1') {
      // Buch ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = true;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = false;
      this.titleAndLocationAreShown = true
    } else if (mediaTypeId === '2') {
      // Film ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = true;
      this.interpretAddFormIsShown = false;
      this.titleAndLocationAreShown = true
    } else if (mediaTypeId === '3') {
      // Musikalbum ist ausgewählt
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = true;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = false;
      this.titleAndLocationAreShown = true
    } else if (mediaTypeId === "4") {
      // Interpret ist ausgewählt
      this.addForm = this.interpretAddForm
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = true;
      this.titleAndLocationAreShown = false
    } else {
      this.songAddFormIsShown = false;
      this.bookAddFormIsShown = false;
      this.musicAlbumAddFormIsShown = false;
      this.movieAddFormIsShown = false;
      this.interpretAddFormIsShown = false;
      this.titleAndLocationAreShown = false
    }
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
      // console.log("Interpret exists")
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
