import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private UPDATE_USER_PROFILE_PATH = "https://radiological-api.herokuapp.com/api/updateProfile/"
  constructor(private http: HttpClient) { }

  updateProfileDetails(category,data) {
    return this.http.put(this.UPDATE_USER_PROFILE_PATH+category,data)
  }
}
