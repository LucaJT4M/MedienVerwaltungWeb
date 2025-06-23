import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsPopUpComponent } from './movie-details-pop-up.component';

describe('MovieDetailsPopUpComponent', () => {
  let component: MovieDetailsPopUpComponent;
  let fixture: ComponentFixture<MovieDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
