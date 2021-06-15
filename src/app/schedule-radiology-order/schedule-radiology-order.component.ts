import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { LocationStrategy } from '@angular/common';
import { ScheduleRadiologyOrderService } from '../service/schedule-radiology-order/schedule-radiology-order.service';
import { AuthenticationService } from '../service/authentication-service/authentication.service';

@Component({
  selector: 'app-schedule-radiology-order',
  templateUrl: './schedule-radiology-order.component.html',
  styleUrls: ['./schedule-radiology-order.component.scss']
})
export class ScheduleRadiologyOrderComponent implements OnInit {
  radiologyOrders: any;
  user: any;

  constructor(private fs:FooterService,
              private location:LocationStrategy,
              private sros:ScheduleRadiologyOrderService,
              private as:AuthenticationService) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.fs.setNameOfComponent(this.constructor.name)
    this.disableBrowserBackBtn()
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
      this.as.setIsAuthenticated(this.user.login)
      if(!this.radiologyOrders) {
        this.sros
            .getRadiologicalOrders()
            .subscribe(r => this.radiologyOrders = r);
      }
  }

  disableBrowserBackBtn() {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

}
