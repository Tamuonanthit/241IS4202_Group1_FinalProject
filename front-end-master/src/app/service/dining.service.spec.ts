import { TestBed } from '@angular/core/testing';

import { DiningService } from './dining.service';

describe('DiningService', () => {
  let service: DiningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
