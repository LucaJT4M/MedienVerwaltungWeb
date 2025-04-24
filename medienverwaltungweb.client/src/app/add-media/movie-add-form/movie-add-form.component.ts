import { Component, OnInit } from '@angular/core';
import { MedienVerwaltungWebService } from '../../shared/medien-verwaltung-web.service';

@Component({
  selector: 'app-movie-add-form',
  templateUrl: './movie-add-form.component.html',
  styleUrls: ['./movie-add-form.component.css'],
  standalone: false,
})
export class MovieAddFormComponent implements OnInit {
  genres: string[] = [
    'Science-Fiction',
    'Fantasy',
    'Horror',
    'Action',
    'Thriller',
    'Dark Drama',
    'Mystery',
  ];
  selectedGenre: string = '';
  todaysDate: Date = new Date();

  constructor(service: MedienVerwaltungWebService) {}

  ngOnInit() {}
}
