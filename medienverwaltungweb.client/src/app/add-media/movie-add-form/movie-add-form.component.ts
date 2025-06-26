import { Component, OnInit } from '@angular/core';
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
  })
  newMovie: MovieDTO = {}
  actorIdList: number[] = []

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

  ngOnInit(): void {}

  addNewMovie() {
    this.newMovie = {
      title: this.movieAddForm.get("title")?.value,
      location: this.movieAddForm.get("location")?.value,
      length: this.movieAddForm.get("length")?.value,
      releaseYear: this.movieAddForm.get("releaseYear")?.value,
      description: this.movieAddForm.get("description")?.value,
      genre: this.movieAddForm.get("genre")?.value,
      actorIDs: this.actorIdList
    }

    this.movieAddForm.reset()
    this.actorIdList = []

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

  setActorList(idList: number[]) {
    this.actorIdList = idList
    this.newMovie.actorIDs = this.actorIdList
  }
}