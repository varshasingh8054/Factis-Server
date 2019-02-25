import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password : String;

  constructor(
    private validateService: ValidateService,
     private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    if (this.authService.loggedIn) {
      console.log(this.authService.loggedIn);
      this.router.navigate(['/dashboard']);
   }
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
        if(data.status) {
          console.log("useer in login" + data.user);
           this.authService.storeUserData(data.token, data.user);
          this.flashMessage.show('You are login', {cssClass: 'alert-success', timeout: 2000});
          this.router.navigate(['dashboard']);
        } else {
          this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['login']);
        }
    });
  }
}
