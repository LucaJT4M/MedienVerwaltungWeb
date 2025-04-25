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
  canNavLastPage: boolean = false;
  canNavLastPageCount: number = 0; // Stellt einfach nur sicher dass canNavLastPage erst nach dem zweiten updatePageNums aktiviert wird
  maxPages: number = 0;

  constructor(public service: SongService) {
    this.updatePageNums();
    this.maxPages = service.maxPages;
  }

  seedSongs() {
    for (let index = 4; index < 20; index++) {
      var newSong: SongDTO = {
        id: index,
        title: 'Song ' + index,
        interpretFullName: 'Max Mustermann',
        length: index,
        location: 'Location ' + index,
      };

      this.songs.push(newSong);
    }
  }

  selectSong(_selectedSong: SongDTO) {
    this.selectedSong = _selectedSong;
  }

  navToNextPage() {
    this.maxPages = this.service.maxPages;

    if (this.currentPage < this.maxPages) {
      this.currentPage++;
    } else {
      console.log('Not navigating: ' + this.maxPages + ' ' + this.currentPage);
    }
    this.updatePageNums();
  }

  navToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage--;
    }
    this.updatePageNums();
  }

  navToPage(pageNum: number) {
    this.service.isPageLastPage(pageNum -1)
    if (pageNum >= 1 && !this.service.isLastPage) {
      this.currentPage = pageNum;
    } 
    this.updatePageNums();
  }

  updatePageNums() {
    if (this.currentPage == 1) {
      this.canNavPrevious = false;
      this.canNavNext = true;
    } else {
      this.canNavPrevious = true;
    }

    if (this.currentPage == this.maxPages) {
      this.canNavNext = false;
    } else {
      this.canNavNext = true;
    }

    if (this.maxPages == 1) {
      this.canNavNext = false;
    } else {
      this.canNavNext = true;
      this.canNavLastPageCount++;
    }

    this.service.getSongPage(this.currentPage);
    this.songs = this.service.songList;
    this.service.getSongPageCount();
    this.maxPages = this.service.maxPages;
  }
}
