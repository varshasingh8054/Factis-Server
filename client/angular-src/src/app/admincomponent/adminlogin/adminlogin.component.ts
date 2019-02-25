import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../adminservices/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  email: String;
  password : String;
  constructor(private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    // if (this.authService.loggedIn) {
    //   console.log(this.authService.loggedIn);
    //   this.router.navigate(['/dashboard']);
   }
   onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
        if(data.status) {
          //  this.authService.storeUserData(data.token, data.user);
          //this.flashMessage.show('You are login', {cssClass: 'alert-success', timeout: 2000});
          this.router.navigate(['dashboard']);
        } else {
         // this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['login']);
        }
    });
  }
}

  




  