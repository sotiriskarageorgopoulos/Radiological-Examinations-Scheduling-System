import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RadiologyScheduledOrder } from 'src/app/interfaces/radiologyScheduledOrder';

@Injectable({
  providedIn: 'root'
})
export class RadiologistAppointmentsService {
  private GET_ORDERS_OF_RADIOLOGIST = "https://radiological-api.herokuapp.com/api/getRadiologicalOrdersForRadiologist/"

  constructor(private http: HttpClient) { }

  getRadiologyOrdersForRadiologist(radiologistId: string){
    return this.http.get<RadiologyScheduledOrder[]>(this.GET_ORDERS_OF_RADIOLOGIST+radiologistId)
  }
}
