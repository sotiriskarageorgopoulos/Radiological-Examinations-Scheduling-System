import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologistAppointmentsComponent } from './radiologist-appointments.component';

describe('RadiologistAppointmentsComponent', () => {
  let component: RadiologistAppointmentsComponent;
  let fixture: ComponentFixture<RadiologistAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologistAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologistAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
