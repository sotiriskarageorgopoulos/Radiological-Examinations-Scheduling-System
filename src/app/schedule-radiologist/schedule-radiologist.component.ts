import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication-service/authentication.service';
import { FooterService } from '../service/footer-service/footer-service.service';
import { ScheduleRadiologistService } from '../service/schedule-radiologist-service/schedule-radiologist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-radiologist',
  templateUrl: './schedule-radiologist.component.html',
  styleUrls: ['./schedule-radiologist.component.scss']
})
export class ScheduleRadiologistComponent implements OnInit {
  user: any;
  radiologistObj: Object;
  patientCode: string;

  constructor(
    private fs: FooterService,
    private scs: ScheduleRadiologistService,
    private as: AuthenticationService,
    private route: ActivatedRoute
  ) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.fs.setNameOfComponent(this.constructor.name)
    this.route.params.subscribe(params => {
      this.patientCode = params["patientCode"];
    })
  }

  ngOnInit(): void {
    this.as.setIsAuthenticated(this.user.login);
  }

  ngDoCheck(): void {
    if(!this.radiologistObj) {
      this
      .scs
      .getRadiologistsSortedByID()
      .subscribe(r=> {
        this.radiologistObj = r
        console.log(this.radiologistObj)
      });
    }
  }

}
