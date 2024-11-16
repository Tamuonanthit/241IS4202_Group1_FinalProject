import { TestBed } from '@angular/core/testing';

import { BookinglistService } from './bookinglist.service';

describe('BookinglistService', () => {
  let service: BookinglistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookinglistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
