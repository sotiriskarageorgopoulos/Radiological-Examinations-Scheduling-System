import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private nameOfComponent:string;

  getNameOfComponent():string {
    return this.nameOfComponent;
  }

  setNameOfComponent(nameOfComponent:string): void {
    if(nameOfComponent !== null) this.nameOfComponent = nameOfComponent;
  }
  
  constructor() { }
}
