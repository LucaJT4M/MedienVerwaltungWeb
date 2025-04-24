import { Component, OnInit } from '@angular/core';
import { MedienVerwaltungWebService } from '../../shared/medien-verwaltung-web.service';
import { Actor } from '../../api-client';

@Component({
  selector: 'app-actor-add-form',
  templateUrl: './actor-add-form.component.html',
  styleUrls: ['./actor-add-form.component.css'],
  standalone: false,
})
export class ActorAddFormComponent implements OnInit {
  public actorList: Actor[] = [];
  private addedActors: Actor[] = [];

  constructor(public service: MedienVerwaltungWebService) {
    if (service.actorList.length > 0) {
      this.actorList = service.actorList;
    }
  }

  ngOnInit() {}

  actorIsSelected(actor: Actor): boolean {
    return this.addedActors.includes(actor);
  }

  toggleActorSelection(actor: Actor) {
    const index = this.addedActors.indexOf(actor);
    if (index > -1) {
      this.addedActors.splice(index, 1);
    } else {
      this.addedActors.push(actor);
    }
  }
}
