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
  movieTitleIF: string = ""

  constructor(public service: MovieService, private movieComp: MovieComponent) {}

  saveMovie(
    toUpdateId: number | undefined,
    newTitle: string,
    inputLength: number | undefined,
    inputReleaseYear: number | undefined,
    inputDescription: string,
    inputGenre: string,
    inputLocation: string,
    inputActorIds: Array<number>
  ) {
    var toUpdateMovie: MovieDTO = {
      id: toUpdateId,
      title: newTitle,
      actorIDs: inputActorIds,
      description: inputDescription,
      genre: inputGenre,
      length: inputLength,
      location: inputLocation,
      releaseYear: inputReleaseYear
    }

    this.service.saveMovie(toUpdateMovie).subscribe({
      next: () => {
        this.movieComp.getDataForMovies
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
