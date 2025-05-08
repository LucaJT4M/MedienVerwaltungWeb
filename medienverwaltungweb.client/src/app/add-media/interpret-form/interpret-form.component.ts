import { AfterViewInit, Component } from '@angular/core';
import { Datepicker, DateRangePicker } from 'vanillajs-datepicker';
import { CommonModule } from '@angular/common';
import { Interpret } from '../../api-client';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InterpretService } from '../../shared/interpretService.service';
import { AddMediaService } from '../../shared/addMedia.service';
import { ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-interpret-form',
  templateUrl: './interpret-form.component.html',
  styleUrls: ['./interpret-form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class InterpretFormComponent implements AfterViewInit {
  newInterpret: Interpret = {}
  birthDateGotChanged: boolean = false

  addForm: FormGroup = new FormGroup({
    firstName: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    birthDate: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
  })

  constructor(
    public service: InterpretService, private toastrService: ToasterService) {
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

  onSubmit() {
    this.newInterpret = {
      birthDate: this.addForm.get("birthDate")?.value,
      firstName: this.addForm.get("firstName")?.value,
      name: this.addForm.get("name")?.value,
      gender: this.addForm.get("gender")?.value,
    }
    this.addForm.reset()
    this.service.addNewInterpret(this.newInterpret).subscribe({
      next: () => {
        window.location.reload()
        this.toastrService.success("Interpret wurde hinzugefügt!")    
      }, 
      error: (err) => {
        // window.location.reload()
        this.toastrService.error("Interpretwurde nicht hinzugefügt")
        console.log(err)
      }
    })
  }

  birthDateClick(event: Event) {
    this.addForm.patchValue({
      birthDate: (event.target as HTMLInputElement).value
    })
  }
}