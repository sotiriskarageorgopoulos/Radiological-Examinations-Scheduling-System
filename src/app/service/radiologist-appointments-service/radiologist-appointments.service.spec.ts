import { TestBed } from '@angular/core/testing';

import { RadiologistAppointmentsService } from './radiologist-appointments.service';

describe('RadiologistAppointmentsService', () => {
  let service: RadiologistAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiologistAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
