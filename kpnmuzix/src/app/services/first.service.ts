import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirstService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  redirectUrl: string = "";
  isLoggedIn: boolean = false;
  logdata: any;
  customerId: any;
  i: any;
  email: any;

  // register service
  registerUser(RegistrationForm: any) {
    console.log(" services works..");
    console.log(RegistrationForm);
    return this.httpClient.post<any>('http://localhost:8090/api/v2/register', RegistrationForm);
  }

  getUser() {
    return this.httpClient.get<any>("http://localhost:8090/api/v3/register/" + this.email);
  }

  // login register service ts
  HttpLogin(data: any) {
    return this.httpClient.post("http://localhost:8090/api/v3/login", data);
  }

}
