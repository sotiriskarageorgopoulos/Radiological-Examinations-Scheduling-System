import { TestBed } from '@angular/core/testing';

import { ScheduleRadiologistService } from './schedule-radiologist.service';

describe('ScheduleRadiologistService', () => {
  let service: ScheduleRadiologistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleRadiologistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
