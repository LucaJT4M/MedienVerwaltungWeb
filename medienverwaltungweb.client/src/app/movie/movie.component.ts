import { Component } from '@angular/core';
import { MovieDTO } from '../api-client';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  standalone: false
})
export class MovieComponent {
  movies: MovieDTO[] = [];
  currentPage: number = 1
  maxPages: number = 1
  canNavPrevious: boolean = false
  canNavNext: boolean = false
  selectedMovie: MovieDTO = {}
  timesNavigated: number = 0

  constructor(private service: MovieService) {
    this.getDataForMovies(this.currentPage)
  }

  selectMovie(_selectedMovie: MovieDTO) {
    this.selectedMovie = _selectedMovie
  }

  navToPage(pageNum: number) {
    this.service.isPageLastPage(pageNum-1)
    if (pageNum >= 1 && !this.service.isLastPage) {
      this.currentPage = pageNum
      this.timesNavigated++
    } else {
      console.log("not navigating")
    }
    console.log(pageNum)
    this.getDataForMovies(this.currentPage)
  }

  updatePageNums() {
    if (this.maxPages > 1 && this.currentPage != this.maxPages + 1) {
      this.canNavNext = true
    } else {
      this.canNavNext = false
    }

    if (this.currentPage != 1) {
      this.canNavPrevious = true;
    } else {
      this.canNavPrevious = false
    }
  }

  getDataForMovies(pageNum: number) {
    this.service.getMoviePageCount().subscribe({
      next: (res) => {
        this.maxPages = res;
        this.service.getMoviePage(pageNum).subscribe({
          next: (res) => {
            this.movies = res
            this.updatePageNums()
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}