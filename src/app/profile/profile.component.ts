import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterService } from '../service/footer-service/footer-service.service';
import { ProfileService } from '../service/profile-service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  user: any = {}

  constructor(private fs:FooterService,
              private ps:ProfileService,
              private router:Router) {
    this.fs.setNameOfComponent(this.constructor.name)
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.createProfileForm()
  }

  createProfileForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.user.name,Validators.required),
      surname: new FormControl(this.user.surname,Validators.required),
      mobileNumber: new FormControl(this.user.mobileNumber,Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber,Validators.required),
      email: new FormControl(this.user.email,Validators.required),
      password: new FormControl(this.user.password,Validators.required),
      address: new FormControl(this.user.address,Validators.required)
    })
  }

  updateProfile() {
    let {name,surname,mobileNumber,phoneNumber,email,password} = this.profileForm.value
    let isValid = name && surname && mobileNumber && phoneNumber && email && password
    if(isValid) {
      let category = this.user.category.charAt(0).toUpperCase()+this.user.category.slice(1)
      if(category === 'Doctor'){
        let data = {...this.profileForm.value,doctorId: this.user.doctorId}
        sessionStorage.setItem('user',JSON.stringify({...this.user,...data}))
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.ps
          .updateProfileDetails(category,data)
          .subscribe()
        this.reloadComponent()
      }
      else if(category === 'Radiologist') {
        let data = {...this.profileForm.value,radiologistId: this.user.radiologistId}
        sessionStorage.setItem('user',JSON.stringify({...this.user,...data}))
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.ps
          .updateProfileDetails(category,data)
          .subscribe()
        this.reloadComponent()
      }
      else if(category === 'Secretary') {
        let data = {...this.profileForm.value,secretaryId: this.user.secretaryId}
        sessionStorage.setItem('user',JSON.stringify({...this.user,...data}))
        this.user = JSON.parse(sessionStorage.getItem('user'))
        this.ps
          .updateProfileDetails(category,data)
          .subscribe()
        this.reloadComponent()
      }
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
