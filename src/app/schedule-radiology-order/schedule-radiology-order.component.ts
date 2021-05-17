import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-schedule-radiology-order',
  templateUrl: './schedule-radiology-order.component.html',
  styleUrls: ['./schedule-radiology-order.component.scss']
})
export class ScheduleRadiologyOrderComponent implements OnInit {

  constructor(private fs:FooterService,
              private location:LocationStrategy) { 
    this.fs.setNameOfComponent(this.constructor.name)
    this.disableBrowserBackBtn()
  }

  ngOnInit(): void {
  }

  disableBrowserBackBtn() {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

}
