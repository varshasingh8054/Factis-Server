
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: String;
  lastName: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
   private authService: AuthService,
   private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
    
  }

  onRegisterSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)) {
      console.log("please fill all field");
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
   this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
   console.log("Please use a valid email");
   return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.status) {
        console.log("In register ts ");
        this.router.navigate(['/login']);
        this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
      } else {
 
        this.flashMessage.show(data.message, {cssClass: 'alert-success', timeout: 3000});
       console.log("error occured");
      }
    });
    }
  }
