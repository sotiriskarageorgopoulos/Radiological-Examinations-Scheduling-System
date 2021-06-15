import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ScheduleRadiologyOrderService } from './service/schedule-radiology-order/schedule-radiology-order.service';
import { FooterService } from './service/footer-service/footer-service.service';
import { routes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './service/authentication-service/authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { SchedulingCalendarComponent } from './scheduling-calendar/scheduling-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ProfileService } from './service/profile-service/profile.service';
import { SchedulingCalendarService } from './service/scheduling-calendar-service/scheduling-calendar.service';
import { ScheduleRadiologistComponent } from './schedule-radiologist/schedule-radiologist.component';

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
    FooterComponent,
    ProfileComponent,
    SchedulingCalendarComponent,
    ScheduleRadiologistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgbModule,
    RouterModule.forRoot(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [
    LoginService,
    RegisterService,
    RadiologyOrderService,
    RadiologistAppointmentsService,
    RadiologyAppointmentService,
    ScheduleRadiologyOrderService,
    AuthGuard,
    FooterService,
    AuthenticationService,
    ProfileService,
    SchedulingCalendarService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
