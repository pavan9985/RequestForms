import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
 RowArray : any = [];
 ColArray : any=[];
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

 FormRowIndex:number;
 FormColIndex:number;

 ngOnInit() {
  this.userForm = this._formBuilder.group({

    FormName: ['', Validators.required],
    RowDataArray: this._formBuilder.array([this.createRowIndexFormGroup()]),
  });
}

constructor(private _formBuilder: FormBuilder, public _openDialog: MatDialog, private _utility: UtilityModule){
  this.FormRowIndex = 1;
  this.FormColIndex = 1;
}


private createRowIndexFormGroup(): FormGroup {
  return new FormGroup({
    'ColDataArray': this._formBuilder.array([this.createColIndexFormGroup()]),
  })
}

private createColIndexFormGroup(): FormGroup {
  return new FormGroup({
    'ColItem': new FormControl('', Validators.required),
  })
}

public addColFormGroup(RowIndex:number, ColIndex:number) {
  // const OptionValidation = this.userForm.get('RowDataArray') as FormArray;
  // if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
  //   this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
  //   return;
  // }
  const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
  if(ColIndex > 2){
    RowDataArray.push(this.createRowIndexFormGroup());
  }
  const ColDataArray=  RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
  ColDataArray.push(this.createColIndexFormGroup());
}

get RowDataFormArray() {
  return this.userForm.controls['RowDataArray'] as FormArray;
}

 CheckBoxOptionsFormArray(int:number) {
  const RowArrray = this.userForm.controls['RowDataArray'] as FormArray;
  return (RowArrray.controls[int] as FormGroup).controls['ColDataArray'] as FormArray;
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
          if(this.FormColIndex >3){
            this.FormColIndex=1;
            this.FormRowIndex +=1;
            // console.log(this.FormRowIndex);
            // console.log(this.FormColIndex);
          }
          data.ColIndex = this.FormColIndex;
          data.RowIndex = this.FormRowIndex;

          
          this.addColFormGroup(this.FormRowIndex-1,this.FormColIndex);
          this.FormColIndex+=1;

          console.log(data);
        }
      });
   }
}
