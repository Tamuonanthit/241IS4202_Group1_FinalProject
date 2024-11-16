import { TestBed } from '@angular/core/testing';

import { PaymentinforService } from './paymentinfor.service';

describe('PaymentinforService', () => {
  let service: PaymentinforService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentinforService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
