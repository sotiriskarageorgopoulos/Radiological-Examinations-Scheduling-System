import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRadiologyOrderComponent } from './schedule-radiology-order.component';

describe('ScheduleRadiologyOrderComponent', () => {
  let component: ScheduleRadiologyOrderComponent;
  let fixture: ComponentFixture<ScheduleRadiologyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleRadiologyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRadiologyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
