import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserModel } from 'src/app/Models/sign-up-in.model';
import { HttpService } from 'src/app/Services/http.service';
import { LoginAuthService } from 'src/app/Services/login-auth.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { HomePageDirectiveComponent } from '../../home-page/home-page-directive/home-page-directive.component';

@Component({
  selector: 'app-sign-up-in-directive',
  templateUrl: './sign-up-in-directive.component.html',
  styleUrls: ['./sign-up-in-directive.component.scss']
})


export class SignUpInDirectiveComponent implements OnInit {
  userModel : UserModel;
  disbool : boolean;
  LoginForm! :FormGroup;
  SignUpForm! :FormGroup;
  IsLogin : boolean=false;
  
  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.SignUpForm = this._formBuilder.group({
      BusinessName: [''],
      UsageType: ['', Validators.required],
      ConfirmPassword : ['', Validators.required],
      Password : ['', Validators.required],
      Email : ['', Validators.required],
      LastName: ['', Validators.required],
      FirstName: ['', Validators.required],
      Mobile: ['', Validators.required],
    });


    this.sub = this.route.params.subscribe(params => {
     var x = params['id'];
     this.disbool = (x =="true");
     });
   }
   
  sub: any;
  
  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute,private nav: Router, private _formBuilder: FormBuilder, 
    private utility : UtilityModule,
    private _httpService:HttpService,
    private _loginAuthService: LoginAuthService) {
    this.disbool = true;
    this.userModel ={} as UserModel;
    // console.log(this.dispalay);
   }
  
  UseAgeType: any = [
    {value: '1', viewValue: 'Business'},
    {value: '2', viewValue: 'Personal'},
  ];

  selectedIssue : any;
  


  LoginClick(){
    if(this.utility.hasValue(this.LoginForm.value.Email) == false){
      this.utility.AlertWarning("Enter Email");
      return;
    }
    if(this.utility.hasValue(this.LoginForm.value.Password) == false){
      this.utility.AlertWarning("Enter Password");
      return;
    }
    this.userModel.Email = this.LoginForm.value.Email;
    this.userModel.Pasword = this.LoginForm.value.Password;

    var req = {
      userName : this.userModel.Email,
      password : this.userModel.Pasword
    }
    var data :any;

    // this._loginAuthService.isAuthenticated(req).subscribe(
    //   (response) => { 
    //     data = response;
    //     localStorage.setItem("UserModel", JSON.stringify(this.userModel));
    //     console.log(localStorage.getItem("UserModel"));
    //     this._loginAuthService.isLoggedIn = true;
    //     this.nav.navigate(['/Dashboard/UserHome']);
    //    },
    //   (error) => { 
    //     this.utility.AlertWarning(error.error.message);  
    //     error
    //    }
    // )



    this._httpService.Post('User/Login',req).subscribe(
      (response) => { 
        data = response;
        localStorage.setItem("UserModel", JSON.stringify(this.userModel));
        console.log(localStorage.getItem("UserModel"));
        this.IsLogin = true;
        this.nav.navigate(['/Dashboard/UserHome']);
       },
      (error) => { 
        this.utility.AlertWarning(error.error.message);  
        localStorage.removeItem("UserModel");
        // error
       });

    // console.log(this.userModel);
    // localStorage.setItem("UserModel", JSON.stringify(this.userModel));
    // console.log(localStorage.getItem("UserModel"));
    // this.nav.navigate(['/Dashboard/UserHome']);
}

SignUpClick(){
  if(this.utility.hasValue(this.SignUpForm.value.FirstName) == false){
    this.utility.AlertWarning("Enter First Name");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.Mobile) == false){
    this.utility.AlertWarning("Enter Mobile Number");
    return;
  }
  if(this.SignUpForm.value.Mobile.length <8 || this.SignUpForm.value.Mobile.length >10 ){
    this.utility.AlertWarning("Mobile Number should be Min 8-Max 10.");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.LastName) == false){
    this.utility.AlertWarning("Enter Last Name");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.Email) == false){
    this.utility.AlertWarning("Enter Email");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.Password) == false){
    this.utility.AlertWarning("Enter Password");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.ConfirmPassword) == false){
    this.utility.AlertWarning("Enter Confirm Password");
    return;
  }
  if(this.utility.hasValue(this.SignUpForm.value.UsageType) == false){
    this.utility.AlertWarning("Select Usage Type");
    return;
  }

  if(this.SignUpForm.value.UsageType =="Business" && this.utility.hasValue(this.SignUpForm.value.BusinessName) == false){
    this.utility.AlertWarning("Enter Business Name.");
    return;
  }

  var req = {
    email : this.SignUpForm.value.Email,
    mobile : '9999999999',
    password : this.SignUpForm.value.Password,
    confirmPassword : this.SignUpForm.value.ConfirmPassword,
    firstName : this.SignUpForm.value.FirstName,
    lastName : this.SignUpForm.value.LastName,
    usageType : this.SignUpForm.value.UsageType,
  }

  this._httpService.Post('User/SignUp',req).subscribe(
    (response) => { 
      this.SignUpForm.reset();
      this.utility.AlertWarning("User Registered, Try to Login.");  
      // localStorage.setItem("UserModel", JSON.stringify(this.userModel));
      // console.log(localStorage.getItem("UserModel"));
      // this.IsLogin = true;
      // this.nav.navigate(['/Dashboard/UserHome']);
     },
    (error) => { 
      
      this.utility.AlertWarning(error.error.message);  
      // localStorage.removeItem("UserModel");
      // error
     });

}
  
}
