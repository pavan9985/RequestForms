import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-form-field-directive',
  templateUrl: './form-field-directive.component.html',
  styleUrls: ['./form-field-directive.component.scss']
})
export class FormFieldDirectiveComponent implements OnInit {
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
  ];

  // radioButtonValues! :FormGroup;

  InputTypeForm!: FormGroup;

  options: any = [];

  selectedFieldType: any;
  TextBoxEmailCheck: boolean = false;
  TextBoxRequiredCheck: boolean = false;
  TextAreaRequireCheck: boolean = false;
  DatePickerRequiredCheck: boolean = false;
  RadioButtonRequired: boolean = false;
  CheckBoxRequired: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _utility: UtilityModule) {

  }

  ngOnInit() {
    this.InputTypeForm = this._formBuilder.group({
      // id: [''],
      // store: ['', Validators.required],

      //The part related to the error
      radioButtonValues: this._formBuilder.array([this.createRadioButtonOptionFormGroup()]),
      CheckBoxValues: this._formBuilder.array([this.createCheckBoxOptionFormGroup()])
      //   [
      //     this._formBuilder.group({
      //        Option: ['', Validators.required],
      //     })
      // ]
    });
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

    }
    // console.log(event.source.value);
  }

  private createRadioButtonOptionFormGroup(): FormGroup {
    return new FormGroup({
      'Option': new FormControl('', Validators.required),
    })
  }
  private createCheckBoxOptionFormGroup(): FormGroup {
    return new FormGroup({
      'Option': new FormControl('', Validators.required),
    })
  }

  public addRadioButtonOptionFormGroup(i: number) {
    const OptionValidation = this.InputTypeForm.get('radioButtonValues') as FormArray;
    if (this._utility.hasValue(OptionValidation.value[OptionValidation.length - 1].Option) == false) {
      this._utility.AlertWarning("Enter Value for Option " + (OptionValidation.length));
      return;
    }
    const RadioButtionOptions = this.InputTypeForm.get('radioButtonValues') as FormArray
    RadioButtionOptions.push(this.createRadioButtonOptionFormGroup())
  }

  public addCheckBoxOptionFormGroup(i: number) {
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
}

