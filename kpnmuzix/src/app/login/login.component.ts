import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirstService } from '../services/first.service';
import { JWToken } from '../model/JWToken';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  
  authenticationToken: any = "";
  signin: any;
  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  get getEmail() {
    return this.LoginForm.controls['email']
  }
  get getPassword() {
    return this.LoginForm.controls['password']
  }

  constructor(
    private firstservice: FirstService,
    private router:Router,
    private authService:AuthService,
    private _snackBar: MatSnackBar
    ) { }

  onSubmit() {
    console.log(this.LoginForm.value);
  }
  loggedin(): void {
    // this.firstservice.email = this.LoginForm.value.email;
    console.log(this.LoginForm.value['email'])
    let email:any=this.LoginForm.value['email']
    this.firstservice.HttpLogin(this.LoginForm.value).subscribe(
      (token:JWToken) => {
      console.log(token);
      this.authenticationToken = token.token;
      console.log("auth token:  " + this.authenticationToken);
        localStorage.setItem("auth_token",this.authenticationToken)
        localStorage.setItem("user_data",email )
        this.authService.IsloggedIn.next(true)
        this._snackBar.open('Logged-in Successfully!!', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigateByUrl("/dashboard")
    },
      err => {
        console.log(err);
        this.authService.IsloggedIn.next(false)
        this._snackBar.open('Invalid User Name or Password', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.LoginForm.reset();
      })
    this.LoginForm.reset({});
    console.log("reset");

  }
  
}
