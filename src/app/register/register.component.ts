import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { RegisterService } from '../service/register-service/register.service';
import { Hospital } from '../interfaces/hospitalsInterface';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.scss']})
export class RegisterComponent implements OnInit {
    hospitals: Hospital[]
    registerForm: FormGroup
    healthWorkerCategory = [{
      title: 'Ιατρός',
      value: 'Doctor'
    },
    {
      title: 'Γραμματέας',
      value: 'Secretary'
    },
    {
      title: 'Ακτινολόγος',
      value: 'Radiologist'
    }];
    genders = [{
      title: 'Άνδρας',
      value: 'MALE'
    },
    {
      title: 'Γυναίκα',
      value: 'FEMALE'
    }]
    constructor(private fs : FooterService,
                private rs: RegisterService,
                private router: Router) {
      this.fs.setNameOfComponent(this.constructor.name)
    }

    ngOnInit() : void {
      this.fetchHospitals();
      this.createRegisterForm();
    }

    ngDoCheck() : void {}

    fetchHospitals(): void {
     this
     .rs
     .getHospitals()
     .subscribe(h => this.hospitals = h);
    }

    createRegisterForm() {
      this.registerForm = new FormGroup({
        name: new FormControl('',Validators.required),
        surname: new FormControl('',Validators.required),
        email: new FormControl('',[Validators.required, 
                                   Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
        password: new FormControl('',Validators.required),
        mobileNumber: new FormControl('',[Validators.required,
                                          Validators.pattern(/^\d{10}$/)]),
        phoneNumber: new FormControl('',[Validators.required,
                                         Validators.pattern(/^\d{10}$/)]),
        birthDate: new FormControl('',Validators.required),
        address: new FormControl('',Validators.required),
        gender: new FormControl('',Validators.required),
        healthWorkerCategory: new FormControl('',Validators.required),
        hospitalId: new FormControl('')
      });
    }

    onSubmitRegister() {
      console.log(this.registerForm);
      if(this.registerForm.valid) {
        let newUser = this.registerForm.value
        let {healthWorkerCategory} = newUser
        if(healthWorkerCategory === 'Doctor') {
          newUser = {...newUser,doctorId: uuidv4()}
        }
        else if(healthWorkerCategory === 'Secretary') {
          newUser = {...newUser,secretaryId: uuidv4()}
        }
        else if(healthWorkerCategory === 'Radiologist') {
          newUser = {...newUser,radiologistId: uuidv4()}
        }
        let {birthDate} = newUser
        newUser = {...newUser,birthDate: birthDate.slice(0,10)}
        console.log(newUser)
        let msg = this
            .rs
            .registerNewUser(healthWorkerCategory,newUser)
            .subscribe(m => {
              if(m.sended) {
                this.registerForm.reset()
                this.reloadComponent() 
                setTimeout(() => this.createSuccessText(),2000)
              }
            })
        console.log(msg)
      }
      else {
        this.createErrorText()
      }
    }
    
    checkError(controlName: string, errorName: string) {
      return this.registerForm.controls[controlName].hasError(errorName);
    }

    reloadComponent() {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
    }

    createErrorText() {
      let errorDiv = document.getElementById("text")
      errorDiv.innerHTML = ''
      let pTag = document.createElement("p")
      pTag.innerHTML = 'Δεν έχετε συμπληρώσει σωστά τα στοιχεία της φόρμας.'
      pTag.style.backgroundColor = "hsl(210,36%,96%)"
      pTag.style.color = "hsl(360,71%,66%)"
      pTag.style.border = "2px solid hsl(360,67%,44%)"
      pTag.style.borderRadius = "0.25rem"
      pTag.style.textAlign = "center"
      pTag.style.padding = "2%"
      errorDiv.appendChild(pTag)
    }

    createSuccessText() {
      let successDiv = document.getElementById("text")
      successDiv.innerHTML = ''
      let pTag = document.createElement("p")
      pTag.innerHTML = 'Η εγγραφή σας έγινε με επιτυχία.'
      pTag.style.backgroundColor = "hsl(210,36%,96%)"
      pTag.style.color = "hsl(125,71%,66%)"
      pTag.style.border = "2px solid hsl(125,67%,44%)"
      pTag.style.borderRadius = "0.25rem"
      pTag.style.textAlign = "center"
      pTag.style.padding = "2%"
      successDiv.appendChild(pTag)
    }

    deleteSuccessText() {
      let successDiv = document.getElementById("text")
      successDiv.innerHTML = ''
    }

    displayHospitals($event) {
      let healthWorkerCategory = $event.target.innerHTML
      let divHospitals = document.getElementById("hospitalsId")
      if(healthWorkerCategory === 'Ιατρός') {
        divHospitals.style.display = "block"
      }
      else {
        divHospitals.style.display = "none"
      }
    }
}
