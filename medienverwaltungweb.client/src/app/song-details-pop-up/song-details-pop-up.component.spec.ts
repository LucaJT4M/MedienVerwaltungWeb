import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailsPopUpComponent } from './song-details-pop-up.component';

describe('SongDetailsPopUpComponent', () => {
  let component: SongDetailsPopUpComponent;
  let fixture: ComponentFixture<SongDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongDetailsPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
