import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authentication: Boolean = false;
  constructor() { }

  getIsAuthenticated(): Boolean {
    return this.authentication
  }

  setIsAuthenticated(authentication:Boolean): void {
    this.authentication = authentication;
  }
}
