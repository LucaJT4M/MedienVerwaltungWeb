import { Component } from '@angular/core';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
import { SongDTO } from '../api-client';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: false,
})
export class BookComponent {
  songList: SongDTO[] = []

  constructor(public service: MedienVerwaltungWebService) {
    this.getSongs()
  }
   
  getSongs() {
    this.service.getSongs().subscribe({
      next: (res) => {
        this.songList = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}