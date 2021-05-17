import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Hospital } from '../../interfaces/hospitalsInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  private GET_HOSPITALS_PATH: string = "/api/getHospitals";
  private POST_A_NEW_USER: string = "/api/register/"

  getHospitals():Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.GET_HOSPITALS_PATH);
  }

  registerNewUser(category: string,newUser):Observable<any> {
    return this.http.post(this.POST_A_NEW_USER+category,JSON.stringify(newUser));
  }
}
