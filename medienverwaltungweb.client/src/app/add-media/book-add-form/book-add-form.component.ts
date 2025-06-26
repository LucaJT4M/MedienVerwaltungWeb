import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookDTO } from '../../api-client';
import { ToasterService } from '../../shared/toaster.service';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-book-add-form',
  templateUrl: './book-add-form.component.html',
  styleUrls: ['./book-add-form.component.css'],
  standalone: false,
})
export class BookAddFormComponent implements OnInit {
  bookAddForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    pageCount: new FormControl(1, Validators.required),
    releaseYear: new FormControl(1, Validators.required),
    location: new FormControl("", Validators.required),
    interpretFullName: new FormControl("", Validators.required)
  })
  interpretNameList: string[] = []
  newBook: BookDTO = {}
  todaysDate: Date = new Date()
  
  constructor(public service: BookService, private toastr: ToasterService) {}

  ngOnInit(): void {
    this.service.getInterpretNames().subscribe({
      next: (res) => {
        this.interpretNameList = res as string[]
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addNewBook() {
    this.newBook = {
      interpretFullName: this.bookAddForm.get("interpretFullName")?.value,
      description: this.bookAddForm.get("description")?.value,
      location: this.bookAddForm.get("location")?.value,
      title: this.bookAddForm.get("title")?.value,
      pageCount: this.bookAddForm.get("pageCount")?.value,
      releaseYear: this.bookAddForm.get("releaseYear")?.value
    }
    this.bookAddForm.reset()

    this.service.addBook(this.newBook).subscribe({
      next:() => {
        window.location.reload()
        this.toastr.success("Buch wurde hinzugefügt!")
      },
      error: (err) => {
        window.location.reload()
        console.log(err)
        this.toastr.error("Buch wurde nicht hinzugefügt!")
      }
    })
  }

  // changeValues(event: Event, input: string) {
  //   var varValue = (event.target as HTMLInputElement).value;
    
  //   if (input == "RY") // für Erscheinungsjahr 
  //   {
  //     this.addService.newBook.releaseYear = +varValue;
  //   } else if (input == "PC") // für Seitenanzahl
  //   {
  //     this.addService.newBook.pageCount = +varValue
  //   } else if (input === "D") // für Beschreibung
  //   {
  //     this.addService.newBook.description = varValue
  //   }
  // } 
}
