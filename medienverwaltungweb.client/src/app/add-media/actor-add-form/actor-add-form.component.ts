import { Component, Input, OnInit } from '@angular/core';
import { MedienVerwaltungWebService } from '../../shared/medien-verwaltung-web.service';
import { Actor } from '../../api-client';
import { MovieAddFormComponent } from '../movie-add-form/movie-add-form.component';

@Component({
  selector: 'app-actor-add-form',
  templateUrl: './actor-add-form.component.html',
  styleUrls: ['./actor-add-form.component.css'],
  standalone: false,
})
export class ActorAddFormComponent implements OnInit {
  actorIdList: number[] = []
  public actorList: Actor[] = [];

  constructor(public service: MedienVerwaltungWebService, private movieAddCompo: MovieAddFormComponent) {
    service.getActors().subscribe({
      next: (res) => {
        this.actorList = res as Actor[]
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit() {}

  changeSelection(id: number | undefined) {
    let Id: number = 0
    Id = Number(id)
    
    // Checks if Id already is in the Array
    if (this.actorIdList.includes(Id)) {
      let index = this.actorIdList.indexOf(Id)
      this.actorIdList.splice(index, 1)
    } else {
      this.actorIdList.push(Id)
    }

    this.movieAddCompo.setActorList(this.actorIdList)
  }
}
