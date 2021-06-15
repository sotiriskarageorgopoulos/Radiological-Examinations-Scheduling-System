import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingCalendarComponent } from './scheduling-calendar.component';

describe('SchedulingCalendarComponent', () => {
  let component: SchedulingCalendarComponent;
  let fixture: ComponentFixture<SchedulingCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
