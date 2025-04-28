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
    this.updatePageNums();
  }

  selectSong(_selectedSong: SongDTO) {
    this.selectedSong = _selectedSong;
  }

  navToNextPage() {
    if (this.currentPage < this.service.maxPages) {
      this.currentPage++;
      this.timesNavigated++;
    } else {
      console.log('Not navigating: ' + this.service.maxPages + ' ' + this.currentPage);
    }
    this.updatePageNums();
  }

  navToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage--;
      this.timesNavigated++;
    }
    this.updatePageNums();
  }

  navToPage(pageNum: number) {
    this.service.isPageLastPage(pageNum -1)
    if (pageNum >= 1 && !this.service.isLastPage) {
      this.currentPage = pageNum;
      this.timesNavigated++;
    } 
    this.updatePageNums();
  }

  updatePageNums() {
    this.service.getSongPageCount().subscribe({
      next: (res) => {
        this.maxPages = res as number;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.service.getSongPage(this.currentPage).subscribe({
      next: (res) => {
        this.songs = res
      },
      error: (err) => {
        console.log(err);
      },
    });

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
}