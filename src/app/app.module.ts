import { NgModule } from '@angular/core';
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
import { ScheduleRadiologyOrderServiceService } from './service/schedule-radiology-order/schedule-radiology-order-service.service';
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
    ProfileComponent
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
    RouterModule.forRoot(routes)
  ],
  providers: [
    LoginService,
    RegisterService,
    RadiologyOrderService,
    RadiologistAppointmentsService,
    RadiologyAppointmentService,
    ScheduleRadiologyOrderServiceService,
    AuthGuard,
    FooterService,
    AuthenticationService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
