import { Component } from '@angular/core';
import { SongDTO } from '../api-client';
import { CommonModule } from '@angular/common';
import { SongDetailsPopUpComponent } from '../song-details-pop-up/song-details-pop-up.component';
import { SongService } from '../shared/song.service'; 

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrl: './song.component.css',
  imports: [CommonModule, SongDetailsPopUpComponent],
})
export class SongComponent {
  songs: SongDTO[] = [];
  selectedSong: SongDTO = {};
  currentPage: number = 1;
  canNavPrevious: boolean = false;
  canNavNext: boolean = false;
  timesNavigated: number = 0;
  maxPages: number = 0;

  constructor(public service: SongService) {
    this.getDataForSongs()
  }

  selectSong(_selectedSong: SongDTO) {
    this.selectedSong = _selectedSong;
  }

  navToPage(pageNum: number) {
    this.service.isPageLastPage(pageNum -1)
    if (pageNum >= 1 && !this.service.isLastPage) {
      this.currentPage = pageNum;
      this.timesNavigated++;
    } 
    this.getDataForSongs();
  }

  updatePageNums() {
    if (this.maxPages > 1 && this.currentPage != this.maxPages + 1) {
        this.canNavNext = true;
    } else {
        this.canNavNext = false;
    }

    if (this.currentPage != 1) {
        this.canNavPrevious = true;
    } else {
        this.canNavPrevious = false;
    }
  }

  getDataForSongs() {
    this.service.getSongPageCount().subscribe({
      next: (res) => {
        this.maxPages = res;
        this.service.getSongPage(this.currentPage).subscribe({
          next: (res) => {
            this.songs = res
            this.updatePageNums()
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}