import { Component, OnInit } from '@angular/core';
import { FooterService } from '../service/footer-service/footer-service.service';
import { AuthenticationService } from '../service/authentication-service/authentication.service';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { RadiologyOrderService } from '../service/radiology-order-service/radiology-order.service';
import { RadiologicalOperations } from '../interfaces/radiologicalOperations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radiology-order',
  templateUrl: './radiology-order.component.html',
  styleUrls: ['./radiology-order.component.scss']
})
export class RadiologyOrderComponent implements OnInit {
  radiologyOrderForm: FormGroup
  radiologyOperations: RadiologicalOperations[]
  groupRadiologyOperations: RadiologicalOperations[][]
  radiologyOperationsCategory: string[] 
  closeModal: string
  user: any

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
              private as: AuthenticationService,
              private modalService: NgbModal,
              private ros: RadiologyOrderService,
              private router: Router) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.fs.setNameOfComponent(this.constructor.name)
    this.disableBrowserBackBtn()
  }

  ngOnInit(): void {
    this.createRadiologyOrderForm()
  }

  ngDoCheck(): void {
    this.as.setIsAuthenticated(this.user.login)
    if(!this.radiologyOperations) {
      this.ros.getRadiologicalOperations()
            .subscribe(r =>{
              this.radiologyOperations = r
            })
    }

    if(this.radiologyOperations !== undefined) {
      this.groupRadiologicalOperations()
    } 
  }

  groupRadiologicalOperations() {
    this.radiologyOperationsCategory = [...new Set(this.radiologyOperations.map(r => r.category))]
    this.groupRadiologyOperations = this.radiologyOperationsCategory
                                    .map(c => {
                                       return this.radiologyOperations
                                           .filter(r => r.category === c)
                                           .map(r => r)
                                    });
  }

  getCheckBoxValues($event) {
    let checked = $event.checked
    let radOpDiv = document.getElementById("radiologicalOperations")
    if(checked) {
      if(radOpDiv.childNodes.length === 0) {
        let h2 = document.createElement("h2")
        h2.innerText = "Ακτινολογικές Εξετάσεις Ασθενή"
        radOpDiv.append(h2)
      }
      let checkBoxValue = $event.source.value
      let div = document.createElement("div")
      div.style.margin = "2%"
      div.style.border = "4px ridge hsl(209,34%,30%)"
      div.style.padding = "2%"
      let pTextName = document.createElement("p")
      pTextName.innerText = checkBoxValue.name
      pTextName.style.fontSize = "16px"
      pTextName.style.fontWeight = "800"
      let pTextCategory = document.createElement("p")
      pTextCategory.innerText = checkBoxValue.category
      pTextCategory.style.fontSize = "16px"
      pTextCategory.style.fontWeight = "800"
      let button = document.createElement("button")
      button.classList.add("btn-sm")
      button.classList.add("btn-danger")
      button.type = "button"
      button.value = checkBoxValue.name
      button.onclick = this.deleteRadiologicalOp
      button.innerText = "Διαγραφή"
      div.append(pTextName)
      div.append(pTextCategory)
      div.append(button)
      radOpDiv.append(div)
    }
  }

  deleteRadiologicalOp($event) {
    let radOp = $event.target.value
    let radOpDiv = document.getElementById("radiologicalOperations")
    for(let i=0;i<radOpDiv.childNodes.length;i++) {
      let checkBoxName = radOpDiv.childNodes[i].childNodes[0] as HTMLElement
      if(checkBoxName.innerText === radOp) {
        radOpDiv.removeChild(radOpDiv.childNodes[i])
        break
      }
    }
  }

  setRadOpValues() {
    let radOpDiv = document.getElementById("radiologicalOperations")
    let radOps = []
    for(let i=1;i<radOpDiv.childNodes.length;i++) {
      let nameOfRadOp = radOpDiv.childNodes[i].childNodes[0] as HTMLElement
      let categoryOfRadOp = radOpDiv.childNodes[i].childNodes[1] as HTMLElement
      radOps.push({name: nameOfRadOp.innerText,category:categoryOfRadOp.innerText})
    }
    return radOps
  }


  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'xl'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  createRadiologyOrderForm() {
    this.radiologyOrderForm = new FormGroup({
      radiologyOrderCode: new FormControl(uuidv4(),Validators.required),
      sendingDate: new FormControl(new Date().toISOString(),Validators.required),
      justification: new FormControl('',Validators.required),
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
        address: new FormControl('',Validators.required),
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

  submitRadOrder() {
      let {
            radiologyOrderCode,
            sendingDate,
            justification,
            priority,
            doctorId,
            patientDetails: {
              name,
              surname,
              gender,
              birthDate,
              phoneNumber,
              mobileNumber,
              patientCode,
              address,
              fatherName,
              motherName,
              insuranceCode
            }
          } = this.radiologyOrderForm.value
      let radOpValues = this.setRadOpValues()
      let isValid = radiologyOrderCode && sendingDate && justification && priority && doctorId && name
                    && surname && gender && birthDate && phoneNumber && mobileNumber && patientCode 
                    && address && fatherName && motherName && insuranceCode && radOpValues
      if(isValid) {
        let radiologyOrderDetails = {...this.radiologyOrderForm.value,radiologicalOperations:radOpValues}
        this
          .ros
          .postRadiologicalOrder(radiologyOrderDetails)
          .subscribe()
        this.radiologyOrderForm.reset()
        this.reloadComponent()
      }
      
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
