import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { LocationStrategy } from '@angular/common';
import { RadiologyScheduledOrder } from '../interfaces/radiologyScheduledOrder';
import { RadiologistAppointmentsService } from '../service/radiologist-appointments-service/radiologist-appointments.service';

@Component({
  selector: 'app-radiologist-appointments',
  templateUrl: './radiologist-appointments.component.html',
  styleUrls: ['./radiologist-appointments.component.scss']
})
export class RadiologistAppointmentsComponent implements OnInit {
  radiologyOrders: RadiologyScheduledOrder[] = []
  user: any
  dataLoaded: boolean = false

  constructor(private fs:FooterService,
              private ras: RadiologistAppointmentsService,
              private location:LocationStrategy) { 
      this.fs.setNameOfComponent(this.constructor.name)
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.disableBrowserBackBtn()
  }

  disableBrowserBackBtn() {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    if(this.radiologyOrders.length === 0) {
      let radiologistId = this.user.radiologistId
      this
      .ras
      .getRadiologyOrdersForRadiologist(radiologistId)
      .subscribe(r => {
        this.radiologyOrders = r
        this.dataLoaded = true
      })
    }
  }

}
