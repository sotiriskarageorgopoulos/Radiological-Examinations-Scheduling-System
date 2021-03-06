import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { AuthenticationService } from '../service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  nameOfComponent: string
  profileLink: string

  constructor(private fs:FooterService,
              private as:AuthenticationService,
              private router:Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.nameOfComponent = this.fs.getNameOfComponent()
  }

  logOut() {
    this.as.logOut()
    this.router.navigate(['/login'])
  }

  goBack() {
    this.location.back();
  }

}
