import { Component, OnInit } from '@angular/core';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
import { InterpretService } from '../shared/interpretService.service';
import { Interpret } from '../api-client';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: false,
})
export class BookComponent implements OnInit {
  txtValue: string = "";
  message : string = "";
  userForm: FormGroup | any;

  constructor(public service: MedienVerwaltungWebService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    console.log(this.userForm.value)
  }

  onTextChange(value: any)
  {
    this.txtValue = value;
    if(this.txtValue == '')
    {
      this.message="Textbox is empty !!!";
    }
  }
}