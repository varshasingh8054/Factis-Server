import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: String;
  confirmedPassword : String;


  constructor(
    private validateService: ValidateService,
     private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onResetPasswordSubmit()
  {
    if(this.password==this.confirmedPassword) 
      {
        console.log("Both are same");
        const user = {
          password: this.password
        }
    this.authService.updatePassword(user).subscribe(data => {
      if(data.status) {
        this.flashMessage.show('Please login with new password', {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 2000});
       console.log("In error resetpassword");
      }
    });
  }
  }

}
