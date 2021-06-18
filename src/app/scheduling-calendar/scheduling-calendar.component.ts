import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
  subHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { AuthenticationService } from '../service/authentication-service/authentication.service';
import { FooterService } from '../service/footer-service/footer-service.service';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SchedulingCalendarService } from '../service/scheduling-calendar-service/scheduling-calendar.service';
import { RadiologyScheduledOrder } from '../interfaces/radiologyScheduledOrder';

const colors: any = {
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  }
};

@Component({
  selector: 'app-scheduling-calendar',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./scheduling-calendar.component.scss'],
  templateUrl: './scheduling-calendar.component.html',
})
export class SchedulingCalendarComponent implements OnInit  {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  user: any;
  patientCode: string;
  radiologistId: string;
  schedulingDateForm: FormGroup
  scheduledRadiologyOrders: RadiologyScheduledOrder[] = []

  constructor(
    private modal: NgbModal,
    private fs: FooterService,
    private as: AuthenticationService,
    private route: ActivatedRoute,
    private scs: SchedulingCalendarService
    ) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.fs.setNameOfComponent(this.constructor.name)
      this.route.params.subscribe(params => {
        this.patientCode = params["patientCode"];
        this.radiologistId = params["radiologistId"];
      })
  }

  ngOnInit(): void {
    this.createSchedulingDateForm()
    this.deleteOldAppointment()
  }

  ngDoCheck(): void {
    this.as.setIsAuthenticated(this.user.login)
    if(this.events.length === 0) {
      this
           .scs
           .getScheduledAppointments()
           .subscribe(e => {
             e.map(r => {
              this.scheduledRadiologyOrders.push(r)
              let title = `Ραντεβού Ακτινολογικής Εξέταση για τον Ακτινολόγο με ακτινολογικό κωδικό ${r.radiologistId} για τον ασθενή με κωδικό ${r.patientDetails.patientCode}.`;
              let executionDate = new Date(r.executionDate).toISOString();
              this.addEvent(title,executionDate)
             })
           })
    }
  }

  deleteOldAppointment() {
    this
        .scs
        .deleteScheduledAppointments()
        .subscribe()
  }

  createSchedulingDateForm() {
    this.schedulingDateForm = new FormGroup({
      dateFrom: new FormControl("",Validators.required)
    })
  }

  onSumbmitTimePeriod() {
    if(this.schedulingDateForm.valid) {
      let dateFrom = this.schedulingDateForm.value.dateFrom;
      let title = `Ραντεβού Ακτινολογικής Εξέταση για τον Ακτινολόγο με ακτινολογικό κωδικό ${this.radiologistId} για τον ασθενή με κωδικό ${this.patientCode}.`;
      let radiologistId = this.radiologistId;
      let executionDate = dateFrom;
      let schedulingData = {radiologistId,executionDate}
      this.postEvent(title,dateFrom,schedulingData)
    }
  }

  postEvent(title,dateFrom,data) {
    this.addEvent(title,dateFrom);
    this
      .scs
      .scheduleAppointment(this.patientCode,data)
      .subscribe()
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(eventTitle: string,startDate: string): void {
    this.events = [
      ...this.events,
      {
        title: eventTitle,
        start: subHours(new Date(startDate),3),
        end: subHours(new Date(startDate), 2),
        color: colors.yellow,
        draggable: false,
      },
    ];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
