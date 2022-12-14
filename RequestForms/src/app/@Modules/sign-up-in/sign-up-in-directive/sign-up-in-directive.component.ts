import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-sign-up-in-directive',
  templateUrl: './sign-up-in-directive.component.html',
  styleUrls: ['./sign-up-in-directive.component.scss']
})


export class SignUpInDirectiveComponent implements OnInit {

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
  
  constructor(private route: ActivatedRoute, private _formBuilder: FormBuilder, private utility : UtilityModule) {
    this.disbool = true;
    
    // console.log(this.dispalay);
   }
  
  foods: any = [
    {value: '1', viewValue: 'Business Related'},
    {value: '2', viewValue: 'Personal Use'},
  ];

  selectedIssue : any;
  


  LoginClick(){
    if(this.utility.hasValue(this.LoginForm.value.Email)){
      console.log(this.LoginForm.value.Email);
    }
}
  
}
