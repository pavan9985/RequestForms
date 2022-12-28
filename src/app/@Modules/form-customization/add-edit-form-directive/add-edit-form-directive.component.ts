import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlDirective, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormCustomize, FormUpdateCustomize } from 'src/app/Models/form-customize.model';
import { UserModel } from 'src/app/Models/sign-up-in.model';
import { HttpService } from 'src/app/Services/http.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { FormViewDirectiveComponent } from '../../form-view/form-view-directive/form-view-directive.component';
import { FormFieldDirectiveComponent } from '../form-field-directive/form-field-directive.component';




@Component({
  selector: 'app-add-edit-form-directive',
  templateUrl: './add-edit-form-directive.component.html',
  styleUrls: ['./add-edit-form-directive.component.scss']
})
export class AddEditFormDirectiveComponent implements OnInit {
  // @ViewChildren('FormName') FormFocus!: QueryList<MatInput>;

  RowDataTypes: any = [];
  bordersView: boolean = true;
  selectedFiles: string = '';
  ComponentState:string;

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
  UserModel: UserModel;
  userModelstr: any;
  GetFormData:any;

  ngOnInit() {

    const data = {
      FieldTypeId: 0,
      FieldLable: 'Empty',
    }
    this.userForm = this._formBuilder.group({

      FormName: ['', Validators.required],
      FormDis: [''],
      RowDataArray: this._formBuilder.array([this.createRowIndexFormGroup(data, -1)]),
    });

    if(this._utility.hasValue(this.FormId) == false){
      return;
    }

    this.httpService.Get('Form/GetClientForm?FormId='+this.FormId).subscribe(
      (response:any) => {
        this.GetFormData = JSON.parse(response.data.formObject); 
        // (((this.userForm.controls['RowDataArray'] as FormArray).controls[0] as FormGroup).controls['ColDataArray'] as FormArray).controls.pop()
        (this.userForm.controls['RowDataArray'] as FormArray).controls.pop();

        // this.userForm.controls.RowDataArray[0].ColDataArray.pop();
        const RowDataArray = this.userForm.get('RowDataArray') as FormArray;

        this.GetFormData.RowDataArray.forEach((rowItem: any, rowindex: number) => {
          RowDataArray.push(this.createRowIndexEditFormGroup(rowItem));
          // rowItem.ColDataArray.forEach((ColItem:any,colIndex:number)=>{
    
          //   // if (rowindex == 0) {
          //   //   const colArray = (this.userForm.get('RowDataArray') as FormArray).controls[rowindex].get('ColDataArray') as FormArray;
          //   //   colArray.controls[colIndex].patchValue(
          //   //     this._data.RowDataArray[rowindex].ColDataArray[colIndex]
          //   //   )
          //   // }
          // })
          
        });
        RowDataArray.push(this.createRowIndexFormGroup(data, -1));
        this.userForm.controls['FormName'].patchValue(this.GetFormData.FormName);
        this.userForm.controls['FormDis'].patchValue(this.GetFormData.FormDis);
      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        this.nav.navigate(['/Dashboard/FormCustomization']);
      }
      )
  }

  constructor(private _formBuilder: FormBuilder, public _openDialog: MatDialog,
    public _closeDialog: MatDialogRef<AddEditFormDirectiveComponent>,
    private _utility: UtilityModule, private cdref: ChangeDetectorRef,
    private httpService: HttpService, private nav: Router,
    @Inject(MAT_DIALOG_DATA)
    public FormId: any) {
      this.ComponentState = 'Save';
      if(this._utility.hasValue(this.FormId)){
        this.ComponentState = 'Update';
      }
    this.userModelstr = localStorage.getItem('UserModel');
    if (this._utility.hasValue(this.userModelstr) == false) {
      this.nav.navigate(['/SignUpIn/false']);
    }
    this.UserModel = JSON.parse(this.userModelstr);
    this.FormRowIndex = 1;
    this.FormColIndex = 1;

  }


  private createRowIndexFormGroup(data: any, rowIndex: number): FormGroup {
    if (rowIndex >= 0) {
      const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
      const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
      while (true) {
        if (ColDataArray.value.find((x: any) => x.FieldType == -1)) {
          ColDataArray.removeAt(ColDataArray.value.findIndex((x: any) => x.FieldType == -1));
          continue;
        }
        else {
          break;
        }

      }
      while (true) {
        if (RowDataArray.value.find((x: any) => x.ColDataArray.length == 0)) {
          RowDataArray.removeAt(RowDataArray.value.findIndex((x: any) => x.ColDataArray.length == 0));
          continue;
        }
        else {
          break;
        }
      }
      // ColDataArray.controls.pop();
      // ColDataArray.controls.pop(ColDataArray.value.find(x => x.FieldType == -1))
    }
    return new FormGroup({
      'ColDataArray': this._formBuilder.array([this.createColIndexFormGroup(data)]),
    })
  }

  private createColIndexFormGroup(data: any): FormGroup {

    return new FormGroup({
      'FieldValueOne': new FormControl(''),
      'FieldValueTwo': new FormControl(''),
      'UploadFileValue': new FormControl(),
      'ArrayOfObjects': new FormControl([]),
      'FieldType': new FormControl(data.FieldTypeId),
      'FieldLable': new FormControl(data.FieldLable),
      'Required': new FormControl(data.Required),
      'MinLength': new FormControl(data.MinLength),
      'MaxLength': new FormControl(data.MaxLength),
      'LowerCase': new FormControl(data.LowerCase),
      'UpperCase': new FormControl(data.UpperCase),
      'EmailFormat': new FormControl(data.EmailFormat),
      'UploadFileTypeId': new FormControl(data.UploadFileTypeId),
      'Options': new FormControl(data.Options),
      'RowIndex': new FormControl(data.RowIndex),
      'ColIndex': new FormControl(data.ColIndex),

    })
  }

  public addColFormGroup(RowIndex: number, ColIndex: number, FieldType: number, FieldLable: string, Fielddata: any) {
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
        FieldValueTwo: '',
        FieldLable: Fielddata.FieldLable,
        FieldType: Fielddata.FieldTypeId,
        Required: Fielddata.Required,
        MinLength: Fielddata.MinLength,
        MaxLength: Fielddata.MaxLength,
        LowerCase: Fielddata.LowerCase,
        UpperCase: Fielddata.UpperCase,
        EmailFormat: Fielddata.EmailFormat,
        UploadFileTypeId: Fielddata.UploadFileTypeId,
        Options: Fielddata.Options,
        RowIndex: Fielddata.RowIndex,
        ColIndex: Fielddata.ColIndex,
      });
      // (this.userForm.get('RowDataArray') as FormArray).controls[ColIndex-1].value.FieldLable = FieldLable;
      // // ColDataArray.controls[ColIndex-1].get('FieldLable')?.valueChanges.subscribe((selectv)=>{
      // //   console.log(selectv);
      // // console.log(ColDataArray.value.FieldLable);
      // // });
      // (this.userForm.get('RowDataArray') as FormArray).controls[ColIndex-1].value.FieldType = FieldType;
      // // this.cdref.detectChanges();
      const data = {
        FieldTypeId: 0,
        FieldLable: 'Empty',
      }
      RowDataArray.push(this.createRowIndexFormGroup(data, RowIndex));
      return;
    }
    const ColDataArray = RowDataArray.controls[RowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[ColIndex - 1].patchValue({
      FieldValueOne: '',
      FieldValueTwo: '',
      FieldLable: Fielddata.FieldLable,
      FieldType: Fielddata.FieldTypeId,
      Required: Fielddata.Required,
      MinLength: Fielddata.MinLength,
      MaxLength: Fielddata.MaxLength,
      LowerCase: Fielddata.LowerCase,
      UpperCase: Fielddata.UpperCase,
      EmailFormat: Fielddata.EmailFormat,
      UploadFileTypeId: Fielddata.UploadFileTypeId,
      Options: Fielddata.Options,
      RowIndex: Fielddata.RowIndex,
      ColIndex: Fielddata.ColIndex,
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
    const data = {
      FieldTypeId: 0,
      FieldLable: 'Empty',
    }
    ColDataArray.push(this.createColIndexFormGroup(data));
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

          this.addColFormGroup(data.RowIndex - 1, data.ColIndex, data.FieldTypeId, data.FieldLable, data);
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
      const data = {
        FieldTypeId: 0,
        FieldLable: 'Empty',
      }
      RowDataArray.push(this.createRowIndexFormGroup(data, rowIndex));
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
    const data = {
      FieldTypeId: 0,
      FieldLable: 'Empty',
    }
    ColDataArray.push(this.createColIndexFormGroup(data));
  }


  BordersAction() {
    if (this.bordersView) {
      this.bordersView = false;
    }
    else {
      this.bordersView = true;
    }
  }




  selectFile(event: any, rowIndex: number, colIndex: number) {
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
    const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[colIndex].patchValue({
      UploadFileValue: event.target.files[0],
    });


    // this.selectedFiles = event.target.files[0].name;
  }

  checkBoxChange(event: any, rowIndex: number, colIndex: number, checkedName: string) {
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
    const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
    if (event.checked) {
      ColDataArray.controls[colIndex].value.ArrayOfObjects.push(checkedName);
    }
    else {
      ColDataArray.controls[colIndex].patchValue({
        ArrayOfObjects: ColDataArray.controls[colIndex].value.ArrayOfObjects.filter((x: any) => x != checkedName)
      });
      // ColDataArray.controls[colIndex].value.ArrayOfObjects.removeAt(ColDataArray.controls[colIndex].value.ArrayOfObjects.findIndex((x:any)=> x === checkedName));
    }
    // ColDataArray.controls[colIndex].patchValue({
    //   ArrayOfObjects : ColDataArray.controls[colIndex].value.ArrayOfObjects.push(checkedName),
    // });
  }


  SaveForm() {
    console.log(this.userForm.value);
    console.log(this.userForm.value);
    const dialogRefserviceProvidersPage = this._openDialog.open(
      FormViewDirectiveComponent,
      {
        panelClass: "full-screen-dialog",
        data: this.userForm.value,
      }
    );




    this._utility.AlertWarning("Form will not go to live, it will save as draft.");
    this._closeDialog.close();
  }

  SaveFormAndGoLive() {
    const stringvalue = JSON.stringify(this.userForm.value);
    const FormData = JSON.parse(stringvalue);
    if(FormData.RowDataArray[FormData.RowDataArray.length-1].ColDataArray.length <= 1){
      FormData.RowDataArray.pop();
    }
    else{
      FormData.RowDataArray[FormData.RowDataArray.length-1].ColDataArray.pop()
    }
    const FormCustomize = {} as FormCustomize;
    FormCustomize.FormName = this.userForm.value.FormName;
    FormCustomize.FormObject = JSON.stringify(FormData);
    FormCustomize.user_id = this.UserModel.user_id

    this.httpService.Post('Form/SaveFormCustomize',FormCustomize).subscribe(
      (response:any) => {
        // data = response;
        // this.userModel.user_id = response.data.user_id; 
        this._utility.AlertWarning("Form Saved");
        this._closeDialog.close();
       },
      (error) => { 
        this._utility.AlertWarning(error.error.message);  
        // localStorage.removeItem("UserModel");
        // error
       });
  }

  UpdateForm(){
    const stringvalue = JSON.stringify(this.userForm.value);
    const FormData = JSON.parse(stringvalue);
    if(FormData.RowDataArray[FormData.RowDataArray.length-1].ColDataArray.length <= 1){
      FormData.RowDataArray.pop();
    }
    else{
      FormData.RowDataArray[FormData.RowDataArray.length-1].ColDataArray.pop()
    }
    const FormCustomize = {} as FormUpdateCustomize;
    FormCustomize.FormName = this.userForm.value.FormName;
    FormCustomize.FormObject = JSON.stringify(FormData);
    FormCustomize.user_id = this.UserModel.user_id;
    FormCustomize.formId = this.FormId;

    this.httpService.Post('Form/UpdateFormCustomize',FormCustomize).subscribe(
      (response:any) => {
        // data = response;
        // this.userModel.user_id = response.data.user_id; 
        this._utility.AlertWarning("Form Updated");
        this._closeDialog.close();
       },
      (error) => { 
        this._utility.AlertWarning(error.error.message);  
        // localStorage.removeItem("UserModel");
        // error
       });
  }

  ClosePopUp() {
    this._closeDialog.close();
  }




// Edit Form Part

private createRowIndexEditFormGroup(rowItem:any): FormGroup {
  // const listFormGroup :Array<FormGroup> =[];
  // rowItem.ColDataArray.forEach((ColItem:any,colIndex:number)=>{
  //   listFormGroup.push(
  //     new FormGroup({
  //       'ColDataArray': this._formBuilder.array([this.createColIndexFormGroup(ColItem)]),
  //     })
  //   )
  // });
  // return listFormGroup;
  return new FormGroup({
    'ColDataArray': this._formBuilder.array(this.createColIndexEditFormGroup(rowItem)),
  })
}


private createColIndexEditFormGroup(rowItem:any): Array<FormGroup> {
  const ColdataArray :Array<FormGroup> = [];
  rowItem.ColDataArray.forEach((ColItem:any,colIndex:number)=>{
    ColdataArray.push(
      new FormGroup({
        'FieldValueOne': new FormControl(''),
        'FieldValueTwo': new FormControl(''),
        'UploadFileValue': new FormControl(),
        'ArrayOfObjects': new FormControl([]),
        'FieldType': new FormControl(ColItem.FieldType),
        'FieldLable': new FormControl(ColItem.FieldLable),
        'Required': new FormControl(ColItem.Required),
        'MinLength': new FormControl(ColItem.MinLength),
        'MaxLength': new FormControl(ColItem.MaxLength),
        'LowerCase': new FormControl(ColItem.LowerCase),
        'UpperCase': new FormControl(ColItem.UpperCase),
        'EmailFormat': new FormControl(ColItem.EmailFormat),
        'UploadFileTypeId': new FormControl(ColItem.UploadFileTypeId),
        'Options': new FormControl(ColItem.Options),
        'RowIndex': new FormControl(ColItem.RowIndex),
        'ColIndex': new FormControl(ColItem.ColIndex),
      })
    )
  });
  return ColdataArray;

  // return new FormGroup({
  //   'FieldValueOne': new FormControl(''),
  //   'FieldValueTwo': new FormControl(''),
  //   'UploadFileValue': new FormControl(),
  //   'ArrayOfObjects': new FormControl([]),
  //   'FieldType': new FormControl(ColItem.FieldType),
  //   'FieldLable': new FormControl(ColItem.FieldLable),
  //   'Required': new FormControl(ColItem.Required),
  //   'MinLength': new FormControl(ColItem.MinLength),
  //   'MaxLength': new FormControl(ColItem.MaxLength),
  //   'LowerCase': new FormControl(ColItem.LowerCase),
  //   'UpperCase': new FormControl(ColItem.UpperCase),
  //   'EmailFormat': new FormControl(ColItem.EmailFormat),
  //   'UploadFileTypeId': new FormControl(ColItem.UploadFileTypeId),
  //   'Options': new FormControl(ColItem.Options),
  //   'RowIndex': new FormControl(ColItem.RowIndex),
  //   'ColIndex': new FormControl(ColItem.ColIndex),
  // })
}








  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
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
