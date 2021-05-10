import {Component, OnInit} from '@angular/core';
import {CovidData} from './covidDataInterface';
import {LoginService} from '../service/login-service/login.service';

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
    
    constructor(private lgs : LoginService) {}
    
    ngOnInit() : void {
        this.fetchData()
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
}
