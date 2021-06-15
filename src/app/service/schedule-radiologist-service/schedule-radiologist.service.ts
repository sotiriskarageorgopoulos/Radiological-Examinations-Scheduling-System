import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ScheduleRadiologistService {

  private GET_RADIOLOGISTS_SORTED_BY_ID = "https://radiological-api.herokuapp.com/api/sortRadiologistsIdByAvailability"

  constructor(private http: HttpClient) { }

  getRadiologistsSortedByID() {
    return this.http.get(this.GET_RADIOLOGISTS_SORTED_BY_ID);
  }
}
