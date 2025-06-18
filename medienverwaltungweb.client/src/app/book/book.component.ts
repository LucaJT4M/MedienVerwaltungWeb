import { Component } from '@angular/core';
import { BookDTO } from '../api-client';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: false,
})
export class BookComponent {
  books: BookDTO[] = [];
  currentPage: number = 1
  maxPages: number = 1
  canNavPrevious: boolean = false
  canNavNext: boolean = false
  selectedBook: BookDTO = {}
  timesNavigated: number = 0

  constructor(private service: BookService) {
    this.getDataForBooks(this.currentPage)
  }

  selectBook(_selectedBook: BookDTO) {
    this.selectedBook = _selectedBook
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
    this.getDataForBooks(this.currentPage)
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

  getDataForBooks(pageNum: number) {
    this.service.getBookPageCount().subscribe({
      next: (res) => {
        this.maxPages = res;
        this.service.getBookPage(pageNum).subscribe({
          next: (res) => {
            this.books = res
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