/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterpretServiceService } from './interpretService.service';

describe('Service: InterpretService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterpretServiceService]
    });
  });

  it('should ...', inject([InterpretServiceService], (service: InterpretServiceService) => {
    expect(service).toBeTruthy();
  }));
});
