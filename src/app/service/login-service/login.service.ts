import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ContactMessage } from 'src/app/interfaces/contactMessage';
import { Login } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private COVID_STATISTICS_PATH: string = "https://api.quarantine.country/api/v1/summary/latest"
  private COUNTRIES_INFO_PATH: string = "https://restcountries.eu/rest/v2/all"
  private CONTACT_MESSAGE_PATH: string = "https://radiological-api.herokuapp.com/api/sendMessage"
  private AUTHENTICATION_PATH: string = "https://radiological-api.herokuapp.com/api/login"
  constructor(private http:HttpClient) { }

  getCovidStatistics() {
    return this.http.get(this.COVID_STATISTICS_PATH)
  }

  getCountriesInfo() {
    return this.http.get(this.COUNTRIES_INFO_PATH)
  }

  postContactMsg(contactMsg:ContactMessage):any {
    return this.http.post(this.CONTACT_MESSAGE_PATH,contactMsg)
  }

  authenticateUser(loginData: Login):any {
    return this.http.post(this.AUTHENTICATION_PATH, loginData)
  }
}
