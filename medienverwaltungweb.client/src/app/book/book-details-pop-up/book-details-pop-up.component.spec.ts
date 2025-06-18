import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsPopUpComponent } from './book-details-pop-up.component';

describe('BookDetailsPopUpComponent', () => {
  let component: BookDetailsPopUpComponent;
  let fixture: ComponentFixture<BookDetailsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
