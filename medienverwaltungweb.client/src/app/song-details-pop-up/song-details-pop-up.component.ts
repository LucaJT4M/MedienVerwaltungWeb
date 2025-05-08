import { Component, Input, } from '@angular/core';
import { SongDTO } from '../api-client';
import { SongService } from '../shared/song.service';
import { SongComponent } from '../song/song.component';

@Component({
  selector: 'app-song-details-pop-up',
  standalone: true,
  templateUrl: './song-details-pop-up.component.html',
  styleUrl: './song-details-pop-up.component.css',
})
export class SongDetailsPopUpComponent {
  @Input() selectedSong: SongDTO = {};
  @Input() currentPage: number = 1;
  songTitleIF: string = '';

  constructor(public service: SongService, private songComp: SongComponent) {}

  saveSong(
    toUpdateSongId: number | undefined,
    newTitle: string,
    newInterpretName: string,
    newSongLength: number,
    newSongLocation: string
  ) {
    var toUpdateSong: SongDTO = {
      id: toUpdateSongId,
      title: newTitle,
      interpretFullName: newInterpretName,
      length: newSongLength,
      location: newSongLocation,
    };

    this.service.saveSong(toUpdateSong, this.currentPage);
  }

  deleteSong(songId: number, currentPage: number) {
    this.service.deleteSong(songId).subscribe({
      next: (res) => {
        this.service.getSongPage(currentPage);
        this.songComp.getDataForSongs(currentPage)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
