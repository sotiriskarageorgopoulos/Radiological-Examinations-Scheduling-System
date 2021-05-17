import { Component, OnInit } from '@angular/core';
import { CovidData } from '../interfaces/covidDataInterface';
import { LoginService } from '../service/login-service/login.service';
import { FooterService } from '../service/footer-service/footer-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { AuthenticationService } from '../service/authenticationService/authentication.service';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})

export class LoginComponent implements OnInit {
    data : CovidData[]
    paginationData: CovidData[]
    pageSize:number = 5
    firstPos:number = 0
    endPos: number = 5
    statistics: any[]
    covidStatistics : any
    countriesName : string[]
    countryCode : string
    countries: any
    messageForm: FormGroup
    loginForm: FormGroup
    
    constructor(private lgs : LoginService, 
                private fs: FooterService,
                private as: AuthenticationService,
                private router: Router) {
        this.fs.setNameOfComponent(this.constructor.name);
    }
    
    ngOnInit() : void {
        this.fetchData()
        this.createLoginForm()
        this.createMessageForm()
    }

    ngDoCheck() : void {
        this.createCovidData()
        this.paginationStructure()
    }

    fetchData() {
        this
            .lgs
            .getCovidStatistics()
            .subscribe(res => {
                this.covidStatistics = res;
            })
        this
            .lgs
            .getCountriesInfo()
            .subscribe(res => {
                this.countries = res
            })
    }

    createCovidData() {
        this.countriesName = Object.keys(this.covidStatistics.data.regions);
        this.statistics = this
                        .countriesName
                        .map(c => {
                            return {
                                country: this.covidStatistics.data.regions[c].iso3166a3,
                                deaths: this.covidStatistics.data.regions[c].deaths.toLocaleString("de-DE"),
                                cases: this.covidStatistics.data.regions[c].total_cases.toLocaleString("de-DE"),
                                recovered: this.covidStatistics.data.regions[c].recovered.toLocaleString("de-DE")
                            }
                        });
         this.data = this
                    .statistics
                    .map(s => {
                        return this.countries
                        .filter(c => s.country === c.alpha3Code)
                        .map(c => {
                            return {...s,country: c.flag}
                        })[0]
                    })
                    .filter(s => s !== undefined);
    }

    paginationStructure() {
        this.paginationData = this.data.slice(this.firstPos,this.endPos)
    }

    changePage($event) {
        let pageNumber = $event.pageIndex + 1
        let pageSize = $event.pageSize
        this.firstPos = pageNumber*pageSize - pageSize
        this.endPos = pageNumber*pageSize
    }

    createLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('',[
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
               ]),
            password: new FormControl('',Validators.required)
        })
    }

    createMessageForm() {
        this.messageForm = new FormGroup({
            name: new FormControl('',Validators.required),
            surname: new FormControl('',Validators.required),
            email: new FormControl('',[
                                       Validators.required,
                                       Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                                      ]),
            subject: new FormControl('',Validators.required),
            message: new FormControl('',Validators.required)
        })
    }

    sendMessage() {
        this
        .lgs
        .postContactMsg(this.messageForm.value)
        .subscribe(m => {
            if(m.sended) {
                this.reloadComponent()
                this.messageForm.reset()
            }
        })
    }

    authentication() {
        this
            .lgs
            .authenticateUser(this.loginForm.value)
            .subscribe(m => {
                if(m.login) {
                    if(m.category === 'doctor') {
                        this.as.setIsAuthenticated(m.login);
                        this.router.navigate(['/radiology_order'])
                    }
                    else if(m.category === 'radiologist') {
                        this.as.setIsAuthenticated(m.login);
                        this.router.navigate(['/radiologist_appointments'])
                    }
                    else if(m.category === 'secretary') {
                        this.as.setIsAuthenticated(m.login);
                        this.router.navigate(['/schedule_radiology_order'])
                    }
                }
                else {
                    this.as.setIsAuthenticated(false)
                }
            })
    }

    checkErrorMessageForm(controlName: string, errorName: string) {
        return this.messageForm.controls[controlName].hasError(errorName)
    }

    checkErrorLoginForm(controlName: string, errorName: string) {
        return this.loginForm.controls[controlName].hasError(errorName)
    }

    reloadComponent() {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
}
