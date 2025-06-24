import { Component, Input } from '@angular/core';
import { MovieDTO } from '../../api-client';
import { MovieService } from '../../shared/movie.service';
import { MovieComponent } from '../movie.component';

@Component({
  selector: 'app-movie-details-pop-up',
  standalone: false,
  templateUrl: './movie-details-pop-up.component.html',
  styleUrl: './movie-details-pop-up.component.css'
})
export class MovieDetailsPopUpComponent {
  @Input() selectedMovie: MovieDTO = {}
  @Input() currentPage: number = 1

  constructor(public service: MovieService, private movieComp: MovieComponent) {}

  saveMovie(
    toUpdateId: number | undefined,
    newTitle: string,
    inputLength: number | undefined,
    inputReleaseYear: number | undefined,
    inputDescription: string,
    inputGenre: string,
    inputLocation: string,
  ) {
    var toUpdateMovie: MovieDTO = {
      id: toUpdateId,
      title: newTitle,
      actorIDs: this.selectedMovie.actorIDs,
      description: inputDescription,
      genre: inputGenre,
      length: inputLength,
      location: inputLocation,
      releaseYear: inputReleaseYear
    }

    this.service.saveMovie(toUpdateMovie).subscribe({
      next: () => {
        this.movieComp.getDataForMovies(this.currentPage)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteMovie(movieId: number, currentPage: number) {
    this.service.deleteMovie(movieId).subscribe({
      next: () => {
        this.service.getMoviePage(currentPage)
        this.movieComp.getDataForMovies(currentPage)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
