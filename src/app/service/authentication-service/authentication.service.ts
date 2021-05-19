import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authentication: Boolean
  constructor() { 
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    if(user) {
      this.authentication = user.login 
    }
    else {
      this.authentication = false
    }
  }

  getIsAuthenticated(): Boolean {
    return this.authentication
  }

  setIsAuthenticated(authentication:Boolean): void {
    this.authentication = authentication;
  }

  logOut() {
    this.setIsAuthenticated(false)
    sessionStorage.clear()
  }
}
