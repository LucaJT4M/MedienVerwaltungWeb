import { Component, OnInit } from '@angular/core';
import { SongDTO } from '../api-client';
import { CommonModule } from '@angular/common';
import { SongDetailsPopUpComponent } from '../song-details-pop-up/song-details-pop-up.component';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
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
      this.updatePageNums();
    } else {
      console.log('Not navigating: ' + this.maxPages + ' ' + this.currentPage);
    }
  }

  navToPreviousPage() {
    if (this.currentPage != 1) {
      this.currentPage--;
      this.updatePageNums();
    }
  }

  navToPage(pageNum: number) {
    if (pageNum >= 1) {
      this.currentPage = pageNum;
      this.updatePageNums();
    }
  }

  updatePageNums() {
    if (this.currentPage == 1) {
      this.canNavPrevious = false;
    } else {
      this.canNavPrevious = true;
    }

    if (this.currentPage == this.maxPages) {
      this.canNavNext = false;
    } else {
      this.canNavNext = true;
    }
    this.service.getSongPage(this.currentPage);
    this.songs = this.service.songList;
    this.service.getSongPageCount();
    this.maxPages = this.service.maxPages;
  }
}
