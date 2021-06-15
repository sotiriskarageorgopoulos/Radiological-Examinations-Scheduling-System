import { TestBed } from '@angular/core/testing';

import { ScheduleRadiologyOrderService } from './schedule-radiology-order.service';

describe('ScheduleRadiologyOrderServiceService', () => {
  let service: ScheduleRadiologyOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleRadiologyOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
