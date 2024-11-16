import { TestBed } from '@angular/core/testing';

import { DininglistService } from './dininglist.service';

describe('DininglistService', () => {
  let service: DininglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DininglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
