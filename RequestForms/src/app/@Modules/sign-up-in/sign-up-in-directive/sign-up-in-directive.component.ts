import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserModel } from 'src/app/Models/sign-up-in.model';
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
  
  ngOnInit() {
    this.LoginForm = this._formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });


    this.sub = this.route.params.subscribe(params => {
     var x = params['id'];
     this.disbool = (x =="true");
     });
   }
   
  sub: any;
  
  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute,private nav: Router, private _formBuilder: FormBuilder, private utility : UtilityModule) {
    this.disbool = true;
    this.userModel ={} as UserModel;
    // console.log(this.dispalay);
   }
  
  foods: any = [
    {value: '1', viewValue: 'Business Related'},
    {value: '2', viewValue: 'Personal Use'},
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
    this.userModel.Pasword = this.LoginForm.value.Email;
    // console.log(this.userModel);
    localStorage.setItem("UserModel", JSON.stringify(this.userModel));
    console.log(localStorage.getItem("UserModel"));
    this.nav.navigate(['/Dashboard/UserHome']);
}
  
}
