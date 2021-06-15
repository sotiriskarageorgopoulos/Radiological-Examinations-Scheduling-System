import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRadiologistComponent } from './schedule-radiologist.component';

describe('ScheduleRadiologistComponent', () => {
  let component: ScheduleRadiologistComponent;
  let fixture: ComponentFixture<ScheduleRadiologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleRadiologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRadiologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
