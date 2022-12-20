import { ChangeDetectorRef, Component, ElementRef, OnInit, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlDirective, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { FormFieldDirectiveComponent } from '../form-field-directive/form-field-directive.component';




@Component({
  selector: 'app-add-edit-form-directive',
  templateUrl: './add-edit-form-directive.component.html',
  styleUrls: ['./add-edit-form-directive.component.scss']
})
export class AddEditFormDirectiveComponent implements OnInit {
  // @ViewChildren('FormName') FormFocus!: QueryList<MatInput>;

  RowDataTypes: any = [];
  bordersView:boolean=true;

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
      RowDataArray: this._formBuilder.array([this.createRowIndexFormGroup(0,'Empty',-1)]),
    });
  }

  constructor(private _formBuilder: FormBuilder, public _openDialog: MatDialog,public _closeDialog: MatDialogRef<AddEditFormDirectiveComponent>, private _utility: UtilityModule, private cdref: ChangeDetectorRef) {
    this.FormRowIndex = 1;
    this.FormColIndex = 1;

  }


  private createRowIndexFormGroup(fieldType:number, FieldLable:string, rowIndex:number): FormGroup {
    if(rowIndex>=0){
      const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
      const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
      while(true){
          if(ColDataArray.value.find((x:any) => x.FieldType == -1)){
          ColDataArray.removeAt(ColDataArray.value.findIndex((x:any) => x.FieldType == -1));
          continue;
          }
          else{
            break;
          }

      }
      while(true){
        if(RowDataArray.value.find((x:any) => x.ColDataArray.length==0)){
          RowDataArray.removeAt(RowDataArray.value.findIndex((x:any) => x.ColDataArray.length==0));
          continue;
          }
          else{
            break;
          }
      }
      // ColDataArray.controls.pop();
      // ColDataArray.controls.pop(ColDataArray.value.find(x => x.FieldType == -1))
    }
    return new FormGroup({
      'ColDataArray': this._formBuilder.array([this.createColIndexFormGroup(fieldType, FieldLable)]),
    })
  }

  private createColIndexFormGroup(typeFile: number, FieldLable: string): FormGroup {

    return new FormGroup({
      'FieldValueOne': new FormControl(''),
      'FieldValueTwo': new FormControl('', Validators.required),
      'FieldType': new FormControl(typeFile),
      'FieldLable': new FormControl(FieldLable),
    })
  }

  public addColFormGroup(RowIndex: number, ColIndex: number, FieldType: number, FieldLable: string) {
    // const OptionValidation = this.userForm.get('RowDataArray') as FormArray;
    // if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
    //   this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
    //   return;
    // }
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
    if (ColIndex > 2) {
      const ColDataArray = RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
      ColDataArray.controls[ColIndex - 1].patchValue({
        FieldValueOne: '',
        FieldLable: FieldLable,
        FieldType: FieldType,
      });
      // (this.userForm.get('RowDataArray') as FormArray).controls[ColIndex-1].value.FieldLable = FieldLable;
      // // ColDataArray.controls[ColIndex-1].get('FieldLable')?.valueChanges.subscribe((selectv)=>{
      // //   console.log(selectv);
      // // console.log(ColDataArray.value.FieldLable);
      // // });
      // (this.userForm.get('RowDataArray') as FormArray).controls[ColIndex-1].value.FieldType = FieldType;
      // // this.cdref.detectChanges();
      RowDataArray.push(this.createRowIndexFormGroup(0,'Empty',RowIndex));
      return;
    }
    const ColDataArray = RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[ColIndex - 1].patchValue({
      FieldValueOne: '',
      FieldLable: FieldLable,
      FieldType: FieldType,
    });
    // (RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray).controls[ColIndex-1].patchValue({
    //   FieldValueOne:'hii',
    //   FieldLable: FieldLable,
    //   FieldType : FieldType,
    // });
    // ColDataArray.controls[ColIndex-1].get('FieldLable')?.valueChanges.subscribe((selectv)=>{
    //   console.log(selectv);
    // console.log(ColDataArray.value.FieldLable);
    // });
    // (RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray).controls[ColIndex-1].value.FieldType = FieldType;
    // ColDataArray.controls[ColIndex-1].get('FieldType')?.valueChanges.subscribe((selectv)=>{
    //   console.log(selectv);
    // console.log(ColDataArray.value.FieldLable);
    // });
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

  public AddRow(rowIndex: number, colIndex: number) {
    if (this._utility.hasValue(this.userForm.value.FormName) == false) {
      this._utility.AlertWarning("Provide Form Name");
      // (<any>this.userForm.get('FormName')).nativeElement.focus();
      // this.cdref.detectChanges();
      // this.FormFocus.first.focus();
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
          // if (this.FormColIndex > 3) {
          //   this.FormColIndex = 1;
          //   this.FormRowIndex += 1;
          //   // console.log(this.FormRowIndex);
          //   // console.log(this.FormColIndex);
          // }
          data.ColIndex = colIndex + 1;//this.FormColIndex;
          data.RowIndex = rowIndex + 1;//this.FormRowIndex;

          this.addColFormGroup(data.RowIndex - 1, data.ColIndex, data.FieldTypeId, data.FieldLable);
          // this.FormColIndex += 1;

          console.log(data);
        }
      });
  }

  LeaveFieldArea(rowIndex: number, colIndex: number) {
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;

    if (colIndex >= 2) {
      const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[colIndex].patchValue({
      FieldValueOne: '',
      FieldLable: 'Leave Label',
      FieldType: -1,
    });
      RowDataArray.push(this.createRowIndexFormGroup(0,'Empty',rowIndex));
      return;
    }
    const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[colIndex].patchValue({
      FieldValueOne: '',
      FieldLable: 'Leave Label',
      FieldType: -1,
    });
    // (RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray).controls[ColIndex-1].patchValue({
    //   FieldValueOne:'hii',
    //   FieldLable: FieldLable,
    //   FieldType : FieldType,
    // });
    // ColDataArray.controls[ColIndex-1].get('FieldLable')?.valueChanges.subscribe((selectv)=>{
    //   console.log(selectv);
    // console.log(ColDataArray.value.FieldLable);
    // });
    // (RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray).controls[ColIndex-1].value.FieldType = FieldType;
    // ColDataArray.controls[ColIndex-1].get('FieldType')?.valueChanges.subscribe((selectv)=>{
    //   console.log(selectv);
    // console.log(ColDataArray.value.FieldLable);
    // });
    // this.cdref.detectChanges();  
    ColDataArray.push(this.createColIndexFormGroup(0, "Empty"));
  }


  BordersAction(){
    if(this.bordersView){
      this.bordersView=false;
    }
    else{
      this.bordersView=true;
    }
  }

  ClosePopUp(){
    this._closeDialog.close();
  }

  Alerttt(y: any) {
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
