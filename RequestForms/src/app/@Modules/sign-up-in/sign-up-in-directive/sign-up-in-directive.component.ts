import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up-in-directive',
  templateUrl: './sign-up-in-directive.component.html',
  styleUrls: ['./sign-up-in-directive.component.scss']
})


export class SignUpInDirectiveComponent implements OnInit {

  disbool : boolean;
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
     var x = params['id'];
     this.disbool = (x =="true");
     });
   }
   
  sub: any;
  
  constructor(private route: ActivatedRoute) {
    this.disbool = true;
    
    // console.log(this.dispalay);
   }
  
  foods: any = [
    {value: '1', viewValue: 'Business Related'},
    {value: '2', viewValue: 'Personal Use'},
  ];

  selectedIssue : any;
  
  
}
