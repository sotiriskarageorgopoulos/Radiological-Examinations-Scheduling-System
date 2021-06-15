import { TestBed } from '@angular/core/testing';

import { SchedulingCalendarService } from './scheduling-calendar.service';

describe('SchedulingCalendarService', () => {
  let service: SchedulingCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
