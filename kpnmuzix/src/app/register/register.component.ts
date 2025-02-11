import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirstService } from '../services/first.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user_image!: string;
  // isImageUploaded: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private firstservice: FirstService,
    private router:Router, private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  RegistrationForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z]*$") 
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', Validators.required),
    gender: new FormControl('',),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[789][0-9]{9}")]),
    // uploadImage:new FormControl('', Validators.required)
  });
  get getUserName() { return this.RegistrationForm.controls['userName']; }
  get getEmail() { return this.RegistrationForm.controls['email']; }
  get getPassword() { return this.RegistrationForm.controls['password']; }
  get getConfirmPassword() { return this.RegistrationForm.controls['confirmPassword']; }
  get getPhoneNumber() { return this.RegistrationForm.controls['phoneNumber']; }
  get getGender() { return this.RegistrationForm.controls['gender']; }
  // get getUploadImage(){return this.RegistrationForm.controls['uploadImage'];}
  OnRegister() {
    console.table(this.RegistrationForm.value);
  //   if (!this.user_image) {
     
  //     alert("Upload image");
  //     return;
  // }
    if (this.getPassword.value != this.getConfirmPassword.value) {
      this._snackBar.open('Your Password and confirm password should match!', 'Dismiss', {
        duration: 2800,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
    else {
      let body:any={
        profilePicture:this.user_image,
        ...this.RegistrationForm.value
      }
      console.log(body,"body checking")
      
      this.firstservice.registerUser(body).subscribe(res => {
        console.log(res);
        this._snackBar.open('User Registered successfully!', 'Dismiss', {
          duration: 2800,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.router.navigateByUrl("/login")
      });
    }
  }

  onFileChange() {
    const fileInput = this.fileInput.nativeElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file :any= fileInput.files[0];
      console.log(file,"file here")
      if (file) {
        this.convertImageToBase64(file).then((base64Image) => {
          this.user_image = base64Image;
          console.log(this.user_image,"Image uploaded");
          // this.isImageUploaded = true;
          fileInput.value = '';
        });
      }
    }
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader:any = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error:any) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }
}

