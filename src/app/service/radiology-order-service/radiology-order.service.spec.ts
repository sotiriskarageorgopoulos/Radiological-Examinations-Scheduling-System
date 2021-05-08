import { TestBed } from '@angular/core/testing';

import { RadiologyOrderService } from './radiology-order.service';

describe('RadiologyOrderService', () => {
  let service: RadiologyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiologyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
