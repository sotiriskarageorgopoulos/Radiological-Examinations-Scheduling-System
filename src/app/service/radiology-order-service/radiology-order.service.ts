import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { RadiologicalOperations } from 'src/app/interfaces/radiologicalOperations';

@Injectable({
  providedIn: 'root'
})
export class RadiologyOrderService {
  private GET_RADIOLOGICAL_OPERATIONS = "https://radiological-api.herokuapp.com/api/getRadiologyOperations"
  private POST_RADIOLOGICAL_ORDER = "https://radiological-api.herokuapp.com/api/insRadiologicalOrderDetails"

  constructor(private http:HttpClient) { }

  getRadiologicalOperations():Observable<RadiologicalOperations[]> {
    return this.http.get<RadiologicalOperations[]>(this.GET_RADIOLOGICAL_OPERATIONS)
  }

  postRadiologicalOrder(radiologicalOrder) {
    return this.http.post(this.POST_RADIOLOGICAL_ORDER,radiologicalOrder)
  }
}
