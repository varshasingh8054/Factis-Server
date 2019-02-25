import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  oldPassword: String;
  newPassword: String;
  confirmedPassword: String;

    constructor(
      private validateService: ValidateService,
     private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }


  onChangePasswordSubmit()
  {
  if(this.newPassword==this.confirmedPassword) 
      {
        console.log("Both are same");
        const user = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        }
    this.authService.changePassword(user).subscribe(data => {
      console.log("In component change password" + data.status);
      if(data.status) {
        this.flashMessage.show('Please login with new password', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 2000});
        console.log("In error chnagepassword");
      }
    });
  }
  else
  {
    this.flashMessage.show("new password and confirme passwprd is not same", {cssClass: 'alert-danger', timeout: 2000});
  }
  }

}
