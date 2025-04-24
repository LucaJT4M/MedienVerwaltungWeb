/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddMediaService } from './addMedia.service';

describe('Service: AddMedia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddMediaService]
    });
  });

  it('should ...', inject([AddMediaService], (service: AddMediaService) => {
    expect(service).toBeTruthy();
  }));
});
