import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MedienVerwaltungWebService } from '../shared/medien-verwaltung-web.service';
import { SongService } from '../shared/song.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
  private currentNav: string = '';
  public homeIsSelected: boolean = false;
  public songIsSelected: boolean = false;
  public bookIsSelected: boolean = false;
  public movieIsSelected: boolean = false;
  public albumIsSelected: boolean = false;
  public actorIsSelected: boolean = false;
  public addMediaIsSelected: boolean = false;
  searchTitle: string = '';

  constructor(private router: Router, private songService: SongService) {}

  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit() {
    this.router.events.subscribe((e) => this.printNavStart(e));
  }

  printNavStart(event: any) {
    if (event.constructor.name === 'NavigationStart') {
      this.currentNav = event.url.replace('/', '');
      // console.log(this.currentNav);
      this.updateView(this.currentNav);
    }
  }

  searchFunc() {
    if (this.currentNav == 'song') {
      this.songService.searchSongByTitle(this.searchTitle);
    }
  }

  updateView(view: string) {
    switch (view) {
      case '': // HomeView is Selected
        this.homeIsSelected = true;
        this.songIsSelected = false;
        this.bookIsSelected = false;
        this.movieIsSelected = false;
        this.albumIsSelected = false;
        this.actorIsSelected = false;
        this.addMediaIsSelected = false;
        break;

      case 'song':
        this.homeIsSelected = false;
        this.songIsSelected = true;
        this.bookIsSelected = false;
        this.movieIsSelected = false;
        this.albumIsSelected = false;
        this.actorIsSelected = false;
        this.addMediaIsSelected = false;
        break;

      case 'book':
        this.homeIsSelected = false;
        this.songIsSelected = false;
        this.bookIsSelected = true;
        this.movieIsSelected = false;
        this.albumIsSelected = false;
        this.actorIsSelected = false;
        this.addMediaIsSelected = false;
        break;

      case 'movie':
        this.homeIsSelected = false;
        this.songIsSelected = false;
        this.bookIsSelected = false;
        this.movieIsSelected = true;
        this.albumIsSelected = false;
        this.actorIsSelected = false;
        this.addMediaIsSelected = false;
        break;

      case 'music-album':
        this.homeIsSelected = false;
        this.songIsSelected = false;
        this.bookIsSelected = false;
        this.movieIsSelected = false;
        this.albumIsSelected = true;
        this.actorIsSelected = false;
        this.addMediaIsSelected = false;
        break;

      case 'actor':
        this.homeIsSelected = false;
        this.songIsSelected = false;
        this.bookIsSelected = false;
        this.movieIsSelected = false;
        this.albumIsSelected = false;
        this.actorIsSelected = true;
        this.addMediaIsSelected = false;
        break;

      case 'add-media':
        this.homeIsSelected = false;
        this.songIsSelected = false;
        this.bookIsSelected = false;
        this.movieIsSelected = false;
        this.albumIsSelected = false;
        this.actorIsSelected = false;
        this.addMediaIsSelected = true;
        break;

      default:
        break;
    }
  }
}
