import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
email : String;
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
   private router: Router,
   private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onEmailSubmit()
  {
    const user = {
      email: this.email
    }

    this.authService.forgotPassword(user).subscribe(data => {
      if(data.status) {
        this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 2000});
        this.flashMessage.show("Reset password from mail", {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['login']);
      } else {
       this.flashMessage.show("email not find", {cssClass: 'alert-success', timeout: 2000});
       //console.log("Error in email submit");
      }
  });
}
  }


