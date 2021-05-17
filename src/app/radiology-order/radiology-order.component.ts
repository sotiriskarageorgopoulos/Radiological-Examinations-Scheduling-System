import { Component, OnInit, HostListener } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-radiology-order',
  templateUrl: './radiology-order.component.html',
  styleUrls: ['./radiology-order.component.scss']
})
export class RadiologyOrderComponent implements OnInit {

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
