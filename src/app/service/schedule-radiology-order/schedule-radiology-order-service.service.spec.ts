import { TestBed } from '@angular/core/testing';

import { ScheduleRadiologyOrderServiceService } from './schedule-radiology-order-service.service';

describe('ScheduleRadiologyOrderServiceService', () => {
  let service: ScheduleRadiologyOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleRadiologyOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
