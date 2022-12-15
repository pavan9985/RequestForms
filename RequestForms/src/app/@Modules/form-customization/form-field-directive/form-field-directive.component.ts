import { Component } from '@angular/core';

@Component({
  selector: 'app-form-field-directive',
  templateUrl: './form-field-directive.component.html',
  styleUrls: ['./form-field-directive.component.scss']
})
export class FormFieldDirectiveComponent {
  FieldTypes : any=[
    {
      viewValue : "Input",
      value : 1
    },
    {
      viewValue : "TextBox",
      value : 2
    },
   ];

   selectedIssue : any;
   EmailCheck:boolean = false;
   RequiredCheck: boolean = false;


   CheckFunctions(event : any, CheckType: string){

    switch(CheckType){
      case "Input-Required":
        this.RequiredCheck = event.checked;
        break;
      case "Email-Format":
        this.EmailCheck = event.checked;
        break;

    }
    // console.log(event.source.value);
  }
}
