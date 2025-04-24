import { TestBed } from '@angular/core/testing';

import { MedienVerwaltungWebService } from './medien-verwaltung-web.service';

describe('MedienVerwaltungWebService', () => {
  let service: MedienVerwaltungWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedienVerwaltungWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
