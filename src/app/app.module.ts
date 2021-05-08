import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RadiologyOrderComponent } from './radiology-order/radiology-order.component';
import { ScheduleRadiologyOrderComponent } from './schedule-radiology-order/schedule-radiology-order.component';
import { RadiologistAppointmentsComponent } from './radiologist-appointments/radiologist-appointments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Component } from './error404/error404.component';
import { RadiologyAppointmentComponent } from './radiology-appointment/radiology-appointment.component';
import { LoginService } from './service/login-service/login.service';
import { RegisterService } from './service/register-service/register.service';
import { RadiologistAppointmentsService } from './service/radiologist-appointments-service/radiologist-appointments.service';
import { RadiologyOrderService } from './service/radiology-order-service/radiology-order.service';
import { RadiologyAppointmentService } from './service/radiology-appointment-service/radiology-appointment.service';
import { ScheduleRadiologyOrderServiceService } from './service/schedule-radiology-order/schedule-radiology-order-service.service';
import { routes } from './routes';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RadiologyOrderComponent,
    ScheduleRadiologyOrderComponent,
    RadiologistAppointmentsComponent,
    Error404Component,
    RadiologyAppointmentComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    RegisterService,
    RadiologyOrderService,
    RadiologistAppointmentsService,
    RadiologyAppointmentService,
    ScheduleRadiologyOrderServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
