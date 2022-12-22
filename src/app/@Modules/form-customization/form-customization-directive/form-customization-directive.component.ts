import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFormDirectiveComponent } from '../add-edit-form-directive/add-edit-form-directive.component';

@Component({
  selector: 'app-form-customization-directive',
  templateUrl: './form-customization-directive.component.html',
  styleUrls: ['./form-customization-directive.component.scss']
})
export class FormCustomizationDirectiveComponent {

  FormsLists : any = [
    {
      FormName: 'Q .net Hiring',
      CreatedDate : '12/12/2022',
      Active: true,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: true,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: true,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: true,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    },
    {
      FormName: 'Business Form',
      CreatedDate : '12/12/2022',
      Active: false,
      TotalSubmitions : 79,
      Config : 'Mail',
      Pendings : 22
    }
  ]


 constructor(public _openDialog: MatDialog){}

 AddFormRow(){
  const dialogRefserviceProvidersPage = this._openDialog.open(
    AddEditFormDirectiveComponent,
    {
      panelClass: "full-screen-dialog",
      data : {
        
      }
    }
  );
  dialogRefserviceProvidersPage
    .beforeClosed()
    .subscribe((data) => {
      if (data) {
      }
    });
 }
}
