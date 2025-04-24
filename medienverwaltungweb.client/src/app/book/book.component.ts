import { Component } from '@angular/core';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  standalone: false,
})
export class BookComponent {
  constructor(public service: MedienVerwaltungWebService) {}

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
