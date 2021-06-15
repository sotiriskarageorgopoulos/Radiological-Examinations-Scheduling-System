import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadiologyScheduledOrder } from '../../interfaces/radiologyScheduledOrder';

@Injectable({
  providedIn: 'root'
})
export class SchedulingCalendarService {
  private UPDATE_SCHEDULE_APPOINTMENT_PATH = "https://radiological-api.herokuapp.com/api/scheduleRadiologyOrder/"
  private GET_SCHEDULE_APPOINTMENT_PATH = "https://radiological-api.herokuapp.com/api/getScheduledRadiologicalOrders"
  private DELETE_OLD_SCHEDULE_APPOINTMENT_PATH = "https://radiological-api.herokuapp.com/api/deleteTheOldAppointments"

  constructor(private http: HttpClient) { }

  scheduleAppointment(patientCode:string,data) {
    return this.http.put(this.UPDATE_SCHEDULE_APPOINTMENT_PATH+patientCode,data);
  }

  getScheduledAppointments() {
    return this.http.get<RadiologyScheduledOrder[]>(this.GET_SCHEDULE_APPOINTMENT_PATH);
  }

  deleteScheduledAppointments() {
    return this.http.delete(this.DELETE_OLD_SCHEDULE_APPOINTMENT_PATH);
  }
}
