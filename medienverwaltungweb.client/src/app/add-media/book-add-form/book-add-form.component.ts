import { Component, OnInit } from '@angular/core';
import { AddMediaService } from '../../shared/addMedia.service';

@Component({
  selector: 'app-book-add-form',
  templateUrl: './book-add-form.component.html',
  styleUrls: ['./book-add-form.component.css'],
  standalone: false,
})
export class BookAddFormComponent implements OnInit {
  constructor(public addService: AddMediaService) {}

  ngOnInit() {}

  changeValues(event: Event, input: string) {
    var varValue = (event.target as HTMLInputElement).value;
    
    if (input == "RY") // für Erscheinungsjahr 
    {
      this.addService.newBook.releaseYear = +varValue;
    } else if (input == "PC") // für Seitenanzahl
    {
      this.addService.newBook.pageCount = +varValue
    } else if (input === "D") // für Beschreibung
    {
      this.addService.newBook.description = varValue
    }
  } 
}
