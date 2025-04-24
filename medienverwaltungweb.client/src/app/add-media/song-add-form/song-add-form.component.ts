import { Component, OnInit } from '@angular/core';
import { AddMediaService } from '../../shared/addMedia.service';

@Component({
  selector: 'app-song-add-form',
  templateUrl: './song-add-form.component.html',
  styleUrls: ['./song-add-form.component.css'],
  standalone: false,
})
export class SongAddFormComponent implements OnInit {
  constructor(public addService: AddMediaService) {}

  ngOnInit() {}

  changeSongLength(event: Event) {
    var songLength = (event.target as HTMLInputElement).value;

    this.addService.newSong.length = +songLength;
  }
}
