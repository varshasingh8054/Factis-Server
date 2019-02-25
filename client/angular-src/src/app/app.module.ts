import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuard1 } from './guards/auth.guard1';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AdminloginComponent } from './admincomponent/adminlogin/adminlogin.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';



const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent,canActivate:[AuthGuard1]},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
   {path:'profile', component: ProfileComponent,canActivate:[AuthGuard]},
  {path:'forgotpassword', component: ForgotpasswordComponent,canActivate:[AuthGuard1]},
  {path:'resetpassword', component: ResetpasswordComponent,canActivate:[AuthGuard1]},
  {path:'changepassword', component: ChangepasswordComponent,canActivate:[AuthGuard]}
 
 
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AdminloginComponent,
    ChangepasswordComponent
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ ValidateService,AuthService,AuthGuard,AuthGuard1],
  bootstrap: [AppComponent]
})
export class AppModule { }
