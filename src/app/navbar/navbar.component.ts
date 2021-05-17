import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nameOfComponent: string

  constructor(private fs:FooterService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.fs.getNameOfComponent()
  }
}
