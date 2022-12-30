import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormCofigModel } from 'src/app/Models/form-customize.model';
import { HttpService } from 'src/app/Services/http.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-form-config-directive',
  templateUrl: './form-config-directive.component.html',
  styleUrls: ['./form-config-directive.component.scss']
})
export class FormConfigDirectiveComponent implements OnInit {
  ResponseConfigTypes:any;
  // =[
  //   {
  //     ResponseTypeId: 1,
  //     ResponseName: "Send form responses to mail",
  //     BillingNote:"No Cost",
  //   },
  //   {
  //     ResponseTypeId: 2,
  //     ResponseName: "Store form responses in TBig Forms.",
  //     BillingNote:"Cost 0.20pisa for each response.",
  //   },
  // ];
  FormConfig!: FormGroup;
  ngOnInit() {

    if(this._utility.hasValue(this.FormId)==false){
      this._utility.AlertWarning("Something went wrong, form not provied.")
      this.nav.navigate(['/Dashboard/FormCustomization']);
    }
    this._httpService.Get("Form/GetFormResponseConfig").subscribe(
      (response: any) => {
        this.ResponseConfigTypes = response.data;
        this.GetFormConfigData();
      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        // error
      });
  }

  GetFormConfigData(){
    this._httpService.Get("Form/GetFormConfig?FromId="+this.FormId).subscribe(
      (response: any) => {
        //this.ResponseConfigTypes = response.data;
        this.FormConfig.patchValue({
          ResponseCongigType :response.data.formConfigType,
          ResponseCongigSource : response.data.formConfigSource
        })
      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        // error
      });
  }

  constructor(private _formBuilder: FormBuilder,private _httpService: HttpService,
    private _utility: UtilityModule, public _closeDialog: MatDialogRef<FormConfigDirectiveComponent>,
    @Inject(MAT_DIALOG_DATA)
    public FormId: any, private nav: Router){
    this.FormConfig = this._formBuilder.group({
      ResponseCongigType: [0, Validators.required],
      ResponseCongigSource: ['', Validators.required],
    });
  }

  GetRespnseconfigSourceLabe():string{
    switch(this.FormConfig.value.ResponseCongigType){
      case 1:
        return "Mail Id";
      default:
        return '';
    }
  }

  GetConfigName():string{
    return this.ResponseConfigTypes?.filter((name:any)=> name.response_id == this.FormConfig.value.ResponseCongigType)[0].name;
  }
  GetConfigFeatures():string{
    return this.ResponseConfigTypes?.filter((name:any)=> name.response_id == this.FormConfig.value.ResponseCongigType)[0].features;
  }
  GetConfigNote():string{
    return this.ResponseConfigTypes?.filter((name:any)=> name.response_id == this.FormConfig.value.ResponseCongigType)[0].note;
  }

  SaveFormConfig(){
    if(this._utility.hasValue(this.FormConfig.value.ResponseCongigType) == false){
      this._utility.AlertWarning("Select Config Type.");
      return;
    }
    if(this.FormConfig.value.ResponseCongigType != 2 && this._utility.hasValue(this.FormConfig.value.ResponseCongigSource) ==false){
      this._utility.AlertWarning("Select "+ this.GetRespnseconfigSourceLabe());
      return;
    }

    const configModel = {} as FormCofigModel;
    configModel.formId = this.FormId;
    configModel.formConfigSource = this.FormConfig.value.ResponseCongigSource;
    configModel.formConfigType = this.FormConfig.value.ResponseCongigType;
    this._httpService.Post("Form/SaveFormConfig", configModel).subscribe(
      (response: any) => {
        this._utility.AlertWarning(response.message);
        this._closeDialog.close();
      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        // error
      });
  }

  CancleFormConfigSettings(){
    this._closeDialog.close();
  }
}
