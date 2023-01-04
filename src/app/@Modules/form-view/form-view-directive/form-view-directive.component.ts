import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/Services/http.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-form-view-directive',
  templateUrl: './form-view-directive.component.html',
  styleUrls: ['./form-view-directive.component.scss']
})
export class FormViewDirectiveComponent implements OnInit {

  userForm!: FormGroup;
  FormModel:any;
  _data :any;
  FormId:number = 0;
  constructor(private _formBuilder: FormBuilder, private _utility: UtilityModule,
    private _httpService : HttpService, private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      var form_id = params['formid'];
      this.FormId = form_id;
      });
    if(this._utility.hasValue(this.FormId) == false || this.FormId <=0){
      this._utility.AlertWarning("No Such Form.");
      return;
    }
    this.userForm = this._formBuilder.group({

      FormName: [''],
      FormDis: [''],
      RowDataArray: this._formBuilder.array([]),
    });

    this._httpService.Get('Form/GetClientForm?FormId='+this.FormId).subscribe(
      (response:any) => { 
        this._data = JSON.parse(response.data.formObject); 
    
        this._data.RowDataArray.forEach((rowItem: any, rowindex: number) => {
          const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
          RowDataArray.push(this.createRowIndexFormGroup(rowItem));
          // rowItem.ColDataArray.forEach((ColItem:any,colIndex:number)=>{
    
          //   // if (rowindex == 0) {
          //   //   const colArray = (this.userForm.get('RowDataArray') as FormArray).controls[rowindex].get('ColDataArray') as FormArray;
          //   //   colArray.controls[colIndex].patchValue(
          //   //     this._data.RowDataArray[rowindex].ColDataArray[colIndex]
          //   //   )
          //   // }
          // })
          
        });
    
        this.userForm.controls['FormName'].patchValue(this._data.FormName);
        this.userForm.controls['FormDis'].patchValue(this._data.FormDis);
       },
      (error) => { 
        this._utility.AlertWarning(error.error.message);
        return;
        // error
       });

    if (this._utility.hasValue(this._data) == false) {
      return;
    }
    
    // this.userForm.controls['RowDataArray'](this._data.RowDataArray);
    // this.userForm.value.RowDataArray = this._data.RowDataArray;

  }

  private createRowIndexFormGroup(rowItem:any): FormGroup {
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
      'ColDataArray': this._formBuilder.array(this.createColIndexFormGroup(rowItem)),
    })
  }


  private createColIndexFormGroup(rowItem:any): Array<FormGroup> {
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


  get RowDataFormArray() {
    return this.userForm.controls['RowDataArray'] as FormArray;
  }


  ColDataFormArray(int: number) {
    const RowArrray = this.userForm.controls['RowDataArray'] as FormArray;
    return (RowArrray.controls[int] as FormGroup).controls['ColDataArray'] as FormArray;
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


  selectFile(event: any, rowIndex: number, colIndex: number) {
    const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
    const ColDataArray = RowDataArray.controls[rowIndex].get('ColDataArray') as FormArray;
    ColDataArray.controls[colIndex].patchValue({
      UploadFileValue: event.target.files[0],
    });

  }

  SubmitFormResponse(){
    if(this._utility.hasValue(this._data) == false || this.FormId <0){
      
      return;
    }

    const strJson = JSON.stringify(this.userForm.value);

    var obj = {
      FormName : "",
      FormObject: strJson
    }

    this._httpService.Post('ClientForm/ClientFormSubmit',obj).subscribe(
      (response:any) => { 
        this._utility.AlertWarning("Working on it.");
          
       },
      (error) => { 
       
        // error
       });


    
  }

  ClearForm(){
    // this.userForm.reset();
    // this.userForm.reset({RowDataArray:[]});
    // this.userForm.controls['RowDataArray']?.reset([]);
    const formarray = this.userForm.controls['RowDataArray'] as FormArray;
    while (formarray.length !== 0) {
      formarray.removeAt(0)
    }
    this._data.RowDataArray.forEach((rowItem: any, rowindex: number) => {
      const RowDataArray = this.userForm.get('RowDataArray') as FormArray;
      RowDataArray.push(this.createRowIndexFormGroup(rowItem));
      // rowItem.ColDataArray.forEach((ColItem:any,colIndex:number)=>{

      //   // if (rowindex == 0) {
      //   //   const colArray = (this.userForm.get('RowDataArray') as FormArray).controls[rowindex].get('ColDataArray') as FormArray;
      //   //   colArray.controls[colIndex].patchValue(
      //   //     this._data.RowDataArray[rowindex].ColDataArray[colIndex]
      //   //   )
      //   // }
      // })
      
    });
  }




}
