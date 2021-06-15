import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { RadiologyAppointmentService } from '../service/radiology-appointment-service/radiology-appointment.service';
import { RadiologyScheduledOrder } from '../interfaces/radiologyScheduledOrder';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-radiology-appointment',
  templateUrl: './radiology-appointment.component.html',
  styleUrls: ['./radiology-appointment.component.scss']
})
export class RadiologyAppointmentComponent implements OnInit {
  user: any
  radiologyOrder: RadiologyScheduledOrder
  radiologyOrderCode: string

  constructor(private fs:FooterService,
              private ras: RadiologyAppointmentService,
              private route: ActivatedRoute) {
    this.fs.setNameOfComponent(this.constructor.name)
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.route.params.subscribe(params => {
      this.radiologyOrderCode = params["radiologyOrderCode"];
    })
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(!this.radiologyOrder) {
      this.ras
          .getAppointmentDetails(this.radiologyOrderCode)
          .subscribe(r => {
            this.radiologyOrder = r
          });
    }
  }

}
