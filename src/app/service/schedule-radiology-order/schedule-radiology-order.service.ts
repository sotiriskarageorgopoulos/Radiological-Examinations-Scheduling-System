import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleRadiologyOrderService {
  private GET_RADIOLOGICAL_ORDERS = "https://radiological-api.herokuapp.com/api/getRadiologicalOrders";

  constructor(private http:HttpClient) { }

  getRadiologicalOrders() {
    return this.http.get(this.GET_RADIOLOGICAL_ORDERS)
  }
}
