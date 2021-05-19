import { Component, OnInit, Inject } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { AuthenticationService } from '../service/authentication-service/authentication.service';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import { LocationStrategy } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-radiology-order',
  templateUrl: './radiology-order.component.html',
  styleUrls: ['./radiology-order.component.scss']
})
export class RadiologyOrderComponent implements OnInit {
  radiologyOrderForm: FormGroup
  user: any;

  genders = [
    {
      title: "Άνδρας",
      value: "MALE"
    },
    {
      title: "Γυναίκα",
      value: "FEMALE"
    }
  ]

  priorities = [
    {
      title:"Κρίσιμη",
      value:"ΕMERGENT"
    },
    {
      title:"Επείγουσα",
      value:"URGENT"
    },
    {
      title:"Σημαντική",
      value:"SEMI_URGENT"
    },
    {
      title:"Όχι Σημαντική",
      value:"NON_URGENT"
    }
  ]

  constructor(private fs:FooterService,
              private location:LocationStrategy,
              private as: AuthenticationService) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.fs.setNameOfComponent(this.constructor.name)
    this.disableBrowserBackBtn()
  }

  ngOnInit(): void {
    this.createRadiologyOrderForm()
  }

  ngDoCheck(): void {
    this.as.setIsAuthenticated(this.user.login)
    console.log(this.user.login)
  }

  openDialog(): void {
    
  }

  createRadiologyOrderForm() {
    this.radiologyOrderForm = new FormGroup({
      radiologyOrderCode: new FormControl(uuidv4(),Validators.required),
      sendingDate: new FormControl(new Date().toISOString(),Validators.required),
      justification: new FormControl('',Validators.required),
      radiologicalOperations: new FormArray([]),
      executionDate: new FormControl('',Validators.required),
      priority: new FormControl('',Validators.required),
      doctorId: new FormControl(this.user.doctorId,Validators.required),
      patientDetails: new FormGroup({
        name:new FormControl('',Validators.required),
        surname: new FormControl('',Validators.required),
        gender: new FormControl('',Validators.required),
        birthDate: new FormControl('',Validators.required),
        phoneNumber: new FormControl('',Validators.required),
        mobileNumber: new FormControl('',Validators.required),
        patientCode: new FormControl(uuidv4(),Validators.required),
        fatherName: new FormControl('',Validators.required),
        motherName: new FormControl('',Validators.required),
        insuranceCode: new FormControl('',Validators.required)
      })
    })
  }

  disableBrowserBackBtn() {
    history.pushState(null, null, window.location.href);  
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });  
  }

  checkError(controlName: string, errorName: string) {
    return this.radiologyOrderForm.controls[controlName].hasError(errorName)
  }

}
