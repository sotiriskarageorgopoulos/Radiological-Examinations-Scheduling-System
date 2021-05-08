import { TestBed } from '@angular/core/testing';

import { RadiologyAppointmentService } from './radiology-appointment.service';

describe('RadiologyAppointmentService', () => {
  let service: RadiologyAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiologyAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
