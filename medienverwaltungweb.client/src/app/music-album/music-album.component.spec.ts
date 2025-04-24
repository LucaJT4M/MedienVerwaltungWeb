import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicAlbumComponent } from './music-album.component';

describe('MusicAlbumComponent', () => {
  let component: MusicAlbumComponent;
  let fixture: ComponentFixture<MusicAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusicAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
