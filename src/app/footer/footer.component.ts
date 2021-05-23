import { Component, Input, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear()
  @Input()
  nameOfComponent: string
  className:string

  constructor(private fs:FooterService) {}

  ngOnInit():void {
   
  }

  ngOnChange():void {

  }

  ngDoCheck():void {
    this.selectClass()
  }

  selectClass() {
    this.nameOfComponent = this.fs.getNameOfComponent();
  }
}
