import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { FormFieldDirectiveComponent } from '../form-field-directive/form-field-directive.component';

@Component({
  selector: 'app-add-edit-form-directive',
  templateUrl: './add-edit-form-directive.component.html',
  styleUrls: ['./add-edit-form-directive.component.scss']
})
export class AddEditFormDirectiveComponent implements OnInit {
 RowDataTypes : any = [];

 selectedIssue: any;
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
 userForm! :FormGroup;

 ngOnInit() {
  this.userForm = this._formBuilder.group({
    FormName: ['', Validators.required],
    FormFields: this._formBuilder.array([]),
  });
}

constructor(private _formBuilder: FormBuilder, public _openDialog: MatDialog, private _utility: UtilityModule){

}
  AddRow(){
    if(this._utility.hasValue(this.userForm.value.FormName) == false){
      this._utility.AlertWarning("Provide Form Name");
      return;
    }
    const dialogRefserviceProvidersPage = this._openDialog.open(
      FormFieldDirectiveComponent,
      {
        panelClass: "view-cart-screen-dialog",
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
