import { AfterViewInit, Component, Input } from '@angular/core';
import { Datepicker } from 'vanillajs-datepicker';
import { CommonModule } from '@angular/common';
import { Interpret } from '../../api-client';
import { FormsModule } from '@angular/forms';
import { InterpretService } from '../../shared/interpretService.service';
import { AddMediaService } from '../../shared/addMedia.service';
import { AddMediaComponent } from '../add-media.component';

@Component({
  selector: 'app-interpret-form',
  templateUrl: './interpret-form.component.html',
  styleUrls: ['./interpret-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class InterpretFormComponent implements AfterViewInit {
  @Input() interpretFullName: string | null | undefined = ""

  selectedIntepret: Interpret = {
    name: '',
    firstName: '',
    gender: '',
  };
  emptyInterpret: Interpret = {
    id: 0,
    name: '',
    firstName: '',
    birthDate: new Date().toDateString(),
    gender: '',
  };

  constructor(
    public service: InterpretService,
    private addService: AddMediaService,
    private addMedia: AddMediaComponent
  ) {
    service.getInterprets();
  }

  ngAfterViewInit(): void {
    const inputEl = document.querySelector(
      'input[name="datepicker_input"]'
    ) as HTMLElement;
    if (inputEl) {
      const datepicker = new Datepicker(inputEl, {
        format: 'dd.mm.yyyy',
        title: 'Geburtsdatum',
      });
    } else {
      console.error('Datepicker input element not found');
    }
  }

  selectExistingInterpret(event: Event) {
    var existingInterpretIdAsString = (event.target as HTMLInputElement).value;
    var existingInterpretId = +existingInterpretIdAsString;

    if (existingInterpretId === this.emptyInterpret.id) {
      this.selectedIntepret = this.emptyInterpret;
    } else {
      this.service.getInterpretById(existingInterpretId).subscribe({
        next: (res) => {
          this.selectedIntepret = res as Interpret;
          this.addService.newInterpret = this.selectedIntepret;
        },
        error(err) {
          console.log(err);
        },
      });
    }
  }

  inputFieldChanged(event: Event, toChangeVar: string) {
    var inputFieldValue = (event.target as HTMLInputElement).value;

    if (toChangeVar === 'FN') {
      this.selectedIntepret.firstName = inputFieldValue;
    } else if (toChangeVar === 'LN') {
      this.selectedIntepret.name = inputFieldValue;
    } else if (toChangeVar === 'BD') {
      this.selectedIntepret.birthDate = inputFieldValue;
    } else if (toChangeVar === 'G') {
      this.selectedIntepret.gender = inputFieldValue;
    }

    this.selectedIntepret.fullName = `${this.selectedIntepret.firstName} ${this.selectedIntepret.name}`

    this.addService.newInterpret = this.selectedIntepret;
    this.addMedia.songAddForm.patchValue({
      interpretFullName: this.selectedIntepret.fullName
    })
  }
}