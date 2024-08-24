import { TestBed } from '@angular/core/testing';

import { NagerDateApiService } from './nager-date-api.service';

describe('NagerDateApiService', () => {
  let service: NagerDateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NagerDateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
