import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RadiologistAppointmentsComponent } from './radiologist-appointments/radiologist-appointments.component';
import { ScheduleRadiologyOrderComponent } from './schedule-radiology-order/schedule-radiology-order.component';
import { RadiologyOrderComponent } from './radiology-order/radiology-order.component';
import { RadiologyAppointmentComponent } from './radiology-appointment/radiology-appointment.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'radiologist_appointments',component:RadiologistAppointmentsComponent, canActivate:[AuthGuard]},
    {path:'schedule_radiology_order',component:ScheduleRadiologyOrderComponent, canActivate:[AuthGuard]},
    {path:'radiology_order',component:RadiologyOrderComponent, canActivate:[AuthGuard]},
    {path:'radiology_appointment/:id',component:RadiologyAppointmentComponent, canActivate:[AuthGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'**',component:Error404Component}
]