import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldModel } from 'src/app/Models/field-model.model';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-form-field-directive',
  templateUrl: './form-field-directive.component.html',
  styleUrls: ['./form-field-directive.component.scss']
})
export class FormFieldDirectiveComponent implements OnInit {
  UploadFileTypes: any = [
    {
      FileTypeName: ".apk",
      FileTypeId: 1
    },
    {
      FileTypeName: ".ipa",
      FileTypeId: 2
    },
    {
      FileTypeName: ".doc",
      FileTypeId: 3
    },
    {
      FileTypeName: ".bat",
      FileTypeId: 4
    },
    {
      FileTypeName: ".csv",
      FileTypeId: 5
    },
    {
      FileTypeName: ".avi",
      FileTypeId: 6
    },
    {
      FileTypeName: ".bin",
      FileTypeId: 7
    },
    {
      FileTypeName: ".bmp",
      FileTypeId: 8
    },
    {
      FileTypeName: ".dll",
      FileTypeId: 9
    },
    {
      FileTypeName: ".exe",
      FileTypeId: 10
    },
    {
      FileTypeName: ".gif",
      FileTypeId: 11
    },
    {
      FileTypeName: ".html",
      FileTypeId: 12
    },
    {
      FileTypeName: ".jar",
      FileTypeId: 13
    },
    {
      FileTypeName: ".jpg",
      FileTypeId: 14
    },
    {
      FileTypeName: ".msi",
      FileTypeId: 15
    },
    {
      FileTypeName: ".jpeg",
      FileTypeId: 16
    },
    {
      FileTypeName: ".png",
      FileTypeId: 17
    },
    {
      FileTypeName: ".mp3",
      FileTypeId: 18
    },
    {
      FileTypeName: ".mp4",
      FileTypeId: 19
    },
    {
      FileTypeName: ".pdf",
      FileTypeId: 20
    },
    {
      FileTypeName: ".mp4",
      FileTypeId: 21
    },
    {
      FileTypeName: ".ppsx",
      FileTypeId: 22
    },
    {
      FileTypeName: ".pptx",
      FileTypeId: 23
    },
    {
      FileTypeName: ".rar",
      FileTypeId: 24
    },
    {
      FileTypeName: ".txt",
      FileTypeId: 25
    },
    {
      FileTypeName: ".tmp",
      FileTypeId: 26
    },
    {
      FileTypeName: ".xlam",
      FileTypeId: 27
    },
    {
      FileTypeName: ".xls",
      FileTypeId: 28
    },
    {
      FileTypeName: ".xlsm",
      FileTypeId: 29
    },
    {
      FileTypeName: ".xlsx",
      FileTypeId: 30
    },
    {
      FileTypeName: ".zip",
      FileTypeId: 31
    },
    {
      FileTypeName: ".json",
      FileTypeId: 32
    },
    {
      FileTypeName: ".xml",
      FileTypeId: 33
    },
    {
      FileTypeName: ".tif",
      FileTypeId: 34
    },
    {
      FileTypeName: ".sys",
      FileTypeId: 35
    },
    {
      FileTypeName: ".pub",
      FileTypeId: 36
    },
    {
      FileTypeName: ".mdb",
      FileTypeId: 37
    },
    {
      FileTypeName: ".iso",
      FileTypeId: 38
    },
  ];

  FieldTypes: any = [
    {
      viewValue: "TextBox",
      value: 1
    },
    {
      viewValue: "Text Area",
      value: 2
    },
    {
      viewValue: "DatePicker",
      value: 3
    },
    {
      viewValue: "Radio Button",
      value: 4
    },
    {
      viewValue: "Check Box",
      value: 5
    },
    {
      viewValue: "File Upload",
      value: 6
    },
  ];

  // radioButtonValues! :FormGroup;

  InputTypeForm!: FormGroup;

  options: any = [];

  selectedFieldType: any;
  selectedUFieldType: any;
  TextBoxEmailCheck: boolean = false;
  TextBoxRequiredCheck: boolean = false;
  TextAreaRequireCheck: boolean = false;
  DatePickerRequiredCheck: boolean = false;
  RadioButtonRequired: boolean = false;
  CheckBoxRequired: boolean = false;
  FileUploadRequire: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _utility: UtilityModule,
    public dialogRef: MatDialogRef<FormFieldDirectiveComponent>,
    @Inject(MAT_DIALOG_DATA)
    public UpdateFormData: any) {

  }

  ngOnInit() {
    this.InputTypeForm = this._formBuilder.group({
      FieldLable: ['', Validators.pattern('[a-zA-Z0-9]*')],
      FieldTypeId: [0, Validators.required],
      TextBoxEmailFormatCheck: [false, Validators.required],
      TextBoxRequiredCheck: [false, Validators.required],
      TextBoxMinLength: [0, Validators.required],
      TextBoxMaxLength: [0, Validators.required],
      TextBoxLowerCase: [false, Validators.required],
      TextBoxUpperCase: [false, Validators.required],
      TextAreaRequired: [false, Validators.required],
      TextAreaMinLength: [0, Validators.required],
      TextAreaMaxLength: [0, Validators.required],
      DatePicketRequired: [false, Validators.required],
      DatePicketStartDate: ['', Validators.required],
      DatePicketEndDate: ['', Validators.required],
      RadioButtonRequired: [false, Validators.required],
      CheckBoxRequired: [false, Validators.required],
      UploadFileRequired: [false, Validators.required],
      UploadFileTypeId: [0, Validators.required],


      //The part related to the error
      radioButtonValues: this._formBuilder.array([this.createRadioButtonOptionFormGroup()]),
      CheckBoxValues: this._formBuilder.array([this.createCheckBoxOptionFormGroup()])
      //   [
      //     this._formBuilder.group({
      //        Option: ['', Validators.required],
      //     })
      // ]
    });


    if (this._utility.hasValue(this.UpdateFormData)) {
      this.InputTypeForm.patchValue({
        FieldLable: this.UpdateFormData.FieldLable,
        FieldTypeId: this.UpdateFormData.FieldType,
        TextBoxEmailFormatCheck: this.UpdateFormData.EmailFormat,
        TextBoxRequiredCheck: this.UpdateFormData.Required,
        TextBoxMinLength: this.UpdateFormData.MinLength,
        TextBoxMaxLength: this.UpdateFormData.MaxLength,
        TextBoxLowerCase: this.UpdateFormData.LowerCase,
        TextBoxUpperCase: this.UpdateFormData.UpperCase,
        TextAreaRequired: this.UpdateFormData.Required,
        TextAreaMinLength: this.UpdateFormData.MinLength,
        DatePicketRequired: this.UpdateFormData.Required,
        DatePicketStartDate: this.UpdateFormData.MinLength,
        DatePicketEndDate: this.UpdateFormData.MaxLength,
        RadioButtonRequired: this.UpdateFormData.Required,
        CheckBoxRequired: this.UpdateFormData.Required,
        UploadFileRequired: this.UpdateFormData.Required,
        UploadFileTypeId: this.UpdateFormData.UploadFileTypeId,
        //radioButtonValue : this.UpdateFormData.Options?.filter((x :any)=> this.createRadioButtonOptionFormGroup(x)),
        //CheckBoxValues : this.UpdateFormData.Options?.filter((x :any)=> this.createRadioButtonOptionFormGroup(x)),
      });

      if (this.InputTypeForm.value.FieldTypeId == 4) {

        const radiobtnVlu = this.InputTypeForm.controls['radioButtonValues'] as FormArray;
        radiobtnVlu.controls.pop();
        this.UpdateFormData.Options?.forEach((x: any) => radiobtnVlu.push(this.createRadioButtonOptionFormGroup(x.Option)));
      }
      if (this.InputTypeForm.value.FieldTypeId == 5) {
        const checkBoxVlu = this.InputTypeForm.controls['CheckBoxValues'] as FormArray;
        checkBoxVlu.controls.pop();
        this.UpdateFormData.Options?.forEach((x: any) => checkBoxVlu.push(this.createRadioButtonOptionFormGroup(x.Option)));
      }
    }
  }
  CheckFunctions(event: any, CheckType: string) {

    switch (CheckType) {
      case "TextBox-Required":
        this.TextBoxRequiredCheck = event.checked;
        break;
      case "TextBoxEmail-Format":
        this.TextBoxEmailCheck = event.checked;
        break;
      case "TextArea-Required":
        this.TextAreaRequireCheck = event.checked;
        break;
      case "DatePicker-Required":
        this.DatePickerRequiredCheck = event.checked;
        break;
      case "RadioButton-Required":
        this.RadioButtonRequired = event.checked;
        break;
      case "CheckBox-Required":
        this.CheckBoxRequired = event.checked;
        break;
      case "FileUpload-Required":
        this.FileUploadRequire = event.checked;
        break;

    }
    // console.log(event.source.value);
  }

  private createRadioButtonOptionFormGroup(data: string = ''): FormGroup {
    return new FormGroup({
      'Option': new FormControl(data, Validators.required),
    })
  }
  private createCheckBoxOptionFormGroup(data: string = ''): FormGroup {
    return new FormGroup({
      'Option': new FormControl(data, Validators.required),
    })
  }

  public addRadioButtonOptionFormGroup() {
    const OptionValidation = this.InputTypeForm.get('radioButtonValues') as FormArray;
    if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
      this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
      return;
    }
    const RadioButtionOptions = this.InputTypeForm.get('radioButtonValues') as FormArray
    RadioButtionOptions.push(this.createRadioButtonOptionFormGroup())
  }

  public addCheckBoxOptionFormGroup() {
    const OptionValidation = this.InputTypeForm.get('CheckBoxValues') as FormArray;
    if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
      this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
      return;
    }
    const CheckBoxOptions = this.InputTypeForm.get('CheckBoxValues') as FormArray
    CheckBoxOptions.push(this.createRadioButtonOptionFormGroup())
  }

  public removeOrClearRadioButtonOptions(i: number) {
    const Options = this.InputTypeForm.get('radioButtonValues') as FormArray
    if (Options.length > 1) {
      Options.removeAt(i)
    } else {
      Options.reset()
    }
  }

  public removeOrClearCheckBoxOptions(i: number) {
    const Options = this.InputTypeForm.get('CheckBoxValues') as FormArray
    if (Options.length > 1) {
      Options.removeAt(i)
    } else {
      Options.reset()
    }
  }

  get RadioButtonOptionsFormArray() {
    return this.InputTypeForm.controls['radioButtonValues'] as FormArray;
  }

  get CheckBoxOptionsFormArray() {
    return this.InputTypeForm.controls['CheckBoxValues'] as FormArray;
  }

  lettersOnly(event: any) {
    var charCode = event.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)

      return true;
    else
      return false;
  }

  FormFieldSave() {
    if (this.InputTypeForm.value.FieldTypeId < 1) {
      this._utility.AlertWarning("Please Select a Field Type.");
      return;
    }
    if (this._utility.hasValue(this.InputTypeForm.value.FieldLable) == false) {
      this._utility.AlertWarning("Field label please");
      return;
    }

    const respData = this.BuildObjecFromFormgroup(this.InputTypeForm);
    this.dialogRef.close(respData);





  }
  CancleFormFiledPopUp() {
    this.dialogRef.close();
  }


  private BuildObjecFromFormgroup(formGroup: FormGroup) {
    let FieldModeldata = new FieldModel();

    FieldModeldata.FieldTypeId = formGroup.value.FieldTypeId;
    switch (formGroup.value.FieldTypeId) {
      case 1:
        FieldModeldata.EmailFormat = formGroup.value.TextBoxEmailFormatCheck;
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.TextBoxRequiredCheck;
        FieldModeldata.MinLength = formGroup.value.TextBoxMinLength;
        FieldModeldata.MaxLength = formGroup.value.TextBoxMaxLength;
        FieldModeldata.LowerCase = formGroup.value.TextBoxLowerCase;
        FieldModeldata.UpperCase = formGroup.value.TextBoxUpperCase;
        return FieldModeldata;
      case 2:
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.TextAreaRequired;
        FieldModeldata.MinLength = formGroup.value.TextAreaMinLength;
        FieldModeldata.MaxLength = formGroup.value.TextAreaMaxLength;
        return FieldModeldata;
      case 3:
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.TextBoxRequiredCheck;
        FieldModeldata.MinLength = formGroup.value.DatePicketStartDate;
        FieldModeldata.MaxLength = formGroup.value.DatePicketEndDate;
        return FieldModeldata;
      case 4:
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.RadioButtonRequired;
        FieldModeldata.Options = formGroup.value.radioButtonValues;
        return FieldModeldata;
      case 5:
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.CheckBoxRequired;
        FieldModeldata.Options = formGroup.value.CheckBoxValues;
        return FieldModeldata;
      case 6:
        FieldModeldata.FieldLable = formGroup.value.FieldLable;
        FieldModeldata.Required = formGroup.value.UploadFileRequired;
        FieldModeldata.UploadFileTypeId = formGroup.value.UploadFileTypeId;
        return FieldModeldata;
      default:
        return FieldModeldata;
    }

  }

}

