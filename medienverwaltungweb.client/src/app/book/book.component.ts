import { Component } from '@angular/core';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
import { InterpretService } from '../shared/interpretService.service';
import { Interpret } from '../api-client';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: false,
})
export class BookComponent {
  txtValue: string = "";
  message : string = "";

  constructor(public service: MedienVerwaltungWebService) {}

  onTextChange(value: any)
  {
    this.txtValue = value;
    if(this.txtValue == '')
    {
      this.message="Textbox is empty !!!";
    }
  }
}