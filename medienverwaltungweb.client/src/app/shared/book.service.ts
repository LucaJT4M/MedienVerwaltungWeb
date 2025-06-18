import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookDTO } from '../api-client';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url: string = environment.apiBaseUrl
  pageSize: number = 10
  isLastPage: boolean = false

  constructor(private http: HttpClient) { }

  getBookPage(page: number): Observable<BookDTO[]> {
    return this.http.get<BookDTO[]>(this.url + `/Book/BookPagination/${page},${this.pageSize}`)
  }

  getBookPageCount(): Observable<number> {
    return this.http.get<number>(this.url + `/Book/GetPageCount/${this.pageSize}`)
  }

  deleteBook(bookId: number) {
    return this.http.delete(this.url + `/Book/${bookId}`)
  }

  saveBook(toUpdateBook: BookDTO) {
    return this.http.put(this.url + `/Book/${toUpdateBook.isbn}`, toUpdateBook)
  }

  addBook(toAddBook: BookDTO) {
    return this.http.post(this.url + `/Book`, toAddBook)
  }

  isPageLastPage(page: number) {
    this.http.get(this.url + `/Book/IsPageLastPage/${page},${this.pageSize}`).subscribe({
      next: (res) => {
        this.isLastPage = res as boolean
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}