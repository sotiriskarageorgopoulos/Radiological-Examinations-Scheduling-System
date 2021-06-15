import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadiologyScheduledOrder } from 'src/app/interfaces/radiologyScheduledOrder';

@Injectable({
  providedIn: 'root'
})
export class RadiologyAppointmentService {
  private GET_RAD_ORDER_DETAILS = "https://radiological-api.herokuapp.com/api/getRadiologicalOrder/"

  constructor(private http:HttpClient) { }

  getAppointmentDetails(radiologyOrderCode) {
    return this.http.get<RadiologyScheduledOrder>(this.GET_RAD_ORDER_DETAILS+radiologyOrderCode)
  }
}
