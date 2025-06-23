import { Component, Input } from '@angular/core';
import { BookDTO } from '../../api-client';
import { BookService } from '../../shared/book.service';
import { BookComponent } from '../book.component';

@Component({
  selector: 'app-book-details-pop-up',
  standalone: false,
  templateUrl: './book-details-pop-up.component.html',
  styleUrl: './book-details-pop-up.component.css'
})
export class BookDetailsPopUpComponent {
  @Input() selectedBook: BookDTO = {}
  @Input() currentPage: number = 1
  // bookTitleIF: string = ""
  
  constructor(public service: BookService, private bookComp: BookComponent) {}

  saveBook(
    toUpdateBookIsbn: number | undefined, 
    newTitle: string,
    newInterpretName: string,
    newDescription: string,
    newPageCount: number | undefined,
    newReleaseYear: number | undefined,
    newLocation: string
  ) {
    var toUpdateBook: BookDTO = {
      isbn: toUpdateBookIsbn,
      title: newTitle,
      interpretFullName: newInterpretName,
      description: newDescription,
      // interpretId: newInterpretId,
      pageCount: newPageCount,
      releaseYear: newReleaseYear,
      location: newLocation
    }

    this.service.saveBook(toUpdateBook).subscribe({
      next: () => {
        this.bookComp.getDataForBooks(this.currentPage)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  deleteBook(bookIsbn: number, currentPage: number) {
    this.service.deleteBook(bookIsbn).subscribe({
      next: (res) => {
        this.service.getBookPage(currentPage)
        this.bookComp.getDataForBooks(currentPage)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
