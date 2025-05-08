import { Component,  OnInit, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../shared/song.service';
import { SongDTO } from '../../api-client';
import { ToasterService } from '../../shared/toaster.service';

@Component({
  selector: 'app-song-add-form',
  templateUrl: './song-add-form.component.html',
  styleUrls: ['./song-add-form.component.css'],
  standalone: false,
})
export class SongAddFormComponent implements OnInit {
  songAddForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    location: new FormControl("", Validators.required),
    songLength: new FormControl(1, Validators.required),
    interpretFullName: new FormControl("", Validators.required),
  })
  interpretNameList: string[] = []
  newSong: SongDTO = {}

  constructor(public service: SongService, private toastr: ToasterService) {}

  ngOnInit(): void {
    this.service.getInterpretNames().subscribe({
      next: (res) => {
        this.interpretNameList = res as string[];
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addNewSong() {
    this.newSong = {
      interpretFullName: this.songAddForm.get("interpretFullName")?.value,
      length: this.songAddForm.get("songLength")?.value,
      location: this.songAddForm.get("location")?.value,
      title: this.songAddForm.get("title")?.value,
    }
    this.songAddForm.reset()

    this.service.addSong(this.newSong).subscribe({
      next:() => {
        window.location.reload()
        this.toastr.success("Song wurde hinzugefügt!")
      },
      error: (err) => {
        window.location.reload()
        console.log(err)
        this.toastr.error("Song wurde nicht hinzugefügt!")
      }
    })
  }
}
