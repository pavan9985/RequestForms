import { ChangeDetectorRef, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  RowDataTypes: any = [];

  selectedIssue: any;
  RowArray: any = [];
  ColArray: any = [];
  FieldTypes: any = [
    {
      viewValue: "Input",
      value: 1
    },
    {
      viewValue: "TextBox",
      value: 2
    },
  ];
  userForm!: FormGroup;
  FormRowIndex: number;
  FormColIndex: number;

  ngOnInit() {
    this.userForm = this._formBuilder.group({

      FormName: ['', Validators.required],
      RowDataArray: this._formBuilder.array([this.createRowIndexFormGroup()]),
    });
  }

  constructor(private _formBuilder: FormBuilder, public _openDialog: MatDialog, private _utility: UtilityModule,private cdref: ChangeDetectorRef) {
    this.FormRowIndex = 1;
    this.FormColIndex = 1;

  }


  private createRowIndexFormGroup(): FormGroup {
    return new FormGroup({
      'ColDataArray': this._formBuilder.array([this.createColIndexFormGroup(0,'Empty')]),
    })
  }

  private createColIndexFormGroup(typeFile:number, FieldLable:string): FormGroup {
    
    return new FormGroup({
      'FieldValueOne': new FormControl(''),
      // 'FieldValueTwo': new FormControl('', Validators.required),
      'FieldType': new FormControl(typeFile),
      'FieldLable': new FormControl(FieldLable),
    })
  }

  public addColFormGroup(RowIndex: number, ColIndex: number, FieldType:number,FieldLable:string) {
    // const OptionValidation = this.userForm.get('RowDataArray') as FormArray;
    // if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
    //   this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
    //   return;
    // }
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
    if (ColIndex > 2) {
      const ColDataArray = RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
      ColDataArray.controls[ColIndex-1].value.FieldLable = FieldLable;
      ColDataArray.controls[ColIndex-1].value.FieldType = FieldType;
      // this.cdref.detectChanges();
      RowDataArray.push(this.createRowIndexFormGroup());
      return;
    }
    const ColDataArray = RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
    
    ColDataArray.controls[ColIndex-1].value.FieldLable = FieldLable;
    ColDataArray.controls[ColIndex-1].value.FieldType = FieldType;
    // this.cdref.detectChanges();  
    ColDataArray.push(this.createColIndexFormGroup(0, "Empty"));
  }

  get RowDataFormArray() {
    return this.userForm.controls['RowDataArray'] as FormArray;
  }

  CheckBoxOptionsFormArray(int: number) {
    const RowArrray = this.userForm.controls['RowDataArray'] as FormArray;
    return (RowArrray.controls[int] as FormGroup).controls['ColDataArray'] as FormArray;
  }

  public AddRow() {
    if (this._utility.hasValue(this.userForm.value.FormName) == false) {
      this._utility.AlertWarning("Provide Form Name");
      return;
    }
    const dialogRefserviceProvidersPage = this._openDialog.open(
      FormFieldDirectiveComponent,
      {
        panelClass: "view-cart-screen-dialog",
        data: {

        }
      }
    );
    dialogRefserviceProvidersPage
      .beforeClosed()
      .subscribe((data) => {
        if (data) {
          if (this.FormColIndex > 3) {
            this.FormColIndex = 1;
            this.FormRowIndex += 1;
            // console.log(this.FormRowIndex);
            // console.log(this.FormColIndex);
          }
          data.ColIndex = this.FormColIndex;
          data.RowIndex = this.FormRowIndex;

          this.addColFormGroup(this.FormRowIndex - 1, this.FormColIndex, data.FieldTypeId,data.FieldLable);
          this.FormColIndex += 1;

          console.log(data);
        }
      });
  }

  Alerttt(y:any){
    // alert(y[1].);
    console.log(y);
  }


  CreateHtml(FieldType: number) {
    let innerFieldHtml: string;
    switch (FieldType) {
      case 1:
        innerFieldHtml = '';
        return;
    }
  }
}
