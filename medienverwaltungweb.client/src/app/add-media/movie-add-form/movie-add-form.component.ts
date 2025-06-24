import { Component, OnInit } from '@angular/core';
import { MedienVerwaltungWebService } from '../../shared/medien-verwaltung-web.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieDTO } from '../../api-client';
import { MovieService } from '../../shared/movie.service';
import { ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-movie-add-form',
  templateUrl: './movie-add-form.component.html',
  styleUrls: ['./movie-add-form.component.css'],
  standalone: false,
})
export class MovieAddFormComponent implements OnInit {
  movieAddForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
    length: new FormControl(1, Validators.required),
    genre: new FormControl("", Validators.required),
    releaseYear: new FormControl(2000, Validators.required),
    description: new FormControl("", Validators.required),
    actorIDs: new FormControl([], Validators.required)
  })
  newMovie: MovieDTO = {}

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

  constructor(public service: MovieService, private toastr: ToasterService) {}

  ngOnInit(): void {
  }

  addNewSong() {
    this.newMovie = {
      title: this.movieAddForm.get("title")?.value,
      location: this.movieAddForm.get("location")?.value,
      length: this.movieAddForm.get("length")?.value,
      releaseYear: this.movieAddForm.get("releaseYear")?.value,
      description: this.movieAddForm.get("description")?.value,
      actorIDs: this.movieAddForm.get("actorIDs")?.value,
      genre: this.movieAddForm.get("genre")?.value
    }

    this.movieAddForm.reset()

    this.service.addMovie(this.newMovie).subscribe({
      next:() => {
        window.location.reload()
        this.toastr.success("Film wurde hinzugefügt!")
      },
      error: (err) => {
        window.location.reload()
        console.log(err)
        this.toastr.error("Film wurde nicht hinzugefügt!")
      }
    })
  }
}
