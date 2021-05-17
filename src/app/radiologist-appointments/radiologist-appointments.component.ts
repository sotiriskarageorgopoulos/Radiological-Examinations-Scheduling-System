import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-radiologist-appointments',
  templateUrl: './radiologist-appointments.component.html',
  styleUrls: ['./radiologist-appointments.component.scss']
})
export class RadiologistAppointmentsComponent implements OnInit {

  constructor(private fs:FooterService,
              private location:LocationStrategy) { 
      this.fs.setNameOfComponent(this.constructor.name)
      this.disableBrowserBackBtn()
  }

  disableBrowserBackBtn() {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

  ngOnInit(): void {}

}
