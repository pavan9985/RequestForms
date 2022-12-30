import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/sign-up-in.model';
import { HttpService } from 'src/app/Services/http.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { AddEditFormDirectiveComponent } from '../add-edit-form-directive/add-edit-form-directive.component';
import { FormConfigDirectiveComponent } from '../form-config-directive/form-config-directive.component';

@Component({
  selector: 'app-form-customization-directive',
  templateUrl: './form-customization-directive.component.html',
  styleUrls: ['./form-customization-directive.component.scss']
})
export class FormCustomizationDirectiveComponent implements OnInit {

  FormsLists: any;
  UserModel: UserModel;
  usrModelStr: any;
  // = [
  //   {
  //     FormName: 'Q .net Hiring',
  //     CreatedDate : '12/12/2022',
  //     Active: true,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: true,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: true,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: true,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   },
  //   {
  //     FormName: 'Business Form',
  //     CreatedDate : '12/12/2022',
  //     Active: false,
  //     TotalSubmitions : 79,
  //     Config : 'Mail',
  //     Pendings : 22
  //   }
  // ]

  ngOnInit() {
    this.usrModelStr = localStorage.getItem('UserModel');
    this.UserModel = JSON.parse(this.usrModelStr);

    if (this._utility.hasValue(this.UserModel) == false) {
      this._utility.AlertWarning("Please Login");
      this.nav.navigate(['/SignUpIn/true']);
      return;
    }
    this._httpService.Get("Form/GetFormsMetaData?UserId=" + this.UserModel.user_id).subscribe(
      (response: any) => {
        this.FormsLists = response.data;
      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        // error
      });
  }

  constructor(public _openDialog: MatDialog, private _httpService: HttpService,
    private _utility: UtilityModule, private nav: Router) {
    this.UserModel = {} as UserModel;
  }

  AddFormRow() {
    const dialogRefserviceProvidersPage = this._openDialog.open(
      AddEditFormDirectiveComponent,
      {
        panelClass: "full-screen-dialog",
        
      }
    );
    dialogRefserviceProvidersPage
      .beforeClosed()
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  EditForm(FormId:number){
    const dialogRefserviceProvidersPage = this._openDialog.open(
      AddEditFormDirectiveComponent,
      {
        panelClass: "full-screen-dialog",
        data: FormId
      }
    );
    dialogRefserviceProvidersPage
      .beforeClosed()
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  DeleteForm(formId:number, isActive:boolean){
    this._httpService.Delete("Form/ActiveDeactiveForm?FormId="+formId+"&IsActive="+!isActive).subscribe(
      (response:any)=>{
        this._utility.AlertWarning(response.message);
        this.ngOnInit();
      },
      (error)=>{
        this._utility.AlertWarning(error.error.message);
      });
  }

  ConfigChange(FormId:number){
    const dialogRefserviceProvidersPage = this._openDialog.open(
      FormConfigDirectiveComponent,
      {
        panelClass: "view-cart-screen-dialog",
        data: FormId
      }
    );
    dialogRefserviceProvidersPage
      .beforeClosed()
      .subscribe((data) => {
        this.ngOnInit();
      });
  }

  FormPrive(FormId:number){
    this.nav.navigate(['/Dashboard/FormView/'+FormId]);
  }
}
