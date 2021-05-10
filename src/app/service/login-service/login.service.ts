import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private COVID_STATISTICS_PATH: string = "https://api.quarantine.country/api/v1/summary/latest";
  private COUNTRIES_INFO: string = "https://restcountries.eu/rest/v2/all";

  constructor(private http:HttpClient) { }

  getCovidStatistics() {
    return this.http.get(this.COVID_STATISTICS_PATH)
  }

  getCountriesInfo() {
    return this.http.get(this.COUNTRIES_INFO)
  }
}
