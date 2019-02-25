import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev;

  constructor(private http: Http) {
      this.isDev = false;  // Change to false before deployment
      }

  registerUser(user) {
    let headers = new Headers();
    console.log(user);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/register', user, {headers:headers})
     .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/login', user, {headers: headers})
      .map(res => res.json());
  }

  changePassword(user)
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('authorization', this.authToken);
    console.log('authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/changePassword', user, {headers: headers})
      .map(res => res.json());
  }

  forgotPassword(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/users/forgotPassword', user, {headers: headers})
      .map(res => res.json());
  }

  resetpassword(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("In reset password" + user);
    return this.http.post('http://localhost:3000/api/users/resetPassword', user, {headers: headers})
      .map(res => res.json());
  }

  updatePassword(user)
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("In update auth password" + JSON.stringify(user));
    return this.http.post('http://localhost:3000/api/users/updatePassword', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
   
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
 
  

}
