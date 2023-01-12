import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Models/sign-up-in.model';
import { HttpService } from 'src/app/Services/http.service';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';

@Component({
  selector: 'app-user-home-directive',
  templateUrl: './user-home-directive.component.html',
  styleUrls: ['./user-home-directive.component.scss']
})
export class UserHomeDirectiveComponent implements OnInit {

formCount :number = 0;
ActiveFormCount :number=0;
TotalFormSubmitionCount :number=0;
AverageFormSubmitionCount :number=0;
HighestSubmitionCountFormName :string ="";
HighestFormSubmitionCount :number=0;


UserModel: UserModel;
usrModelStr: any;
  constructor(private _httpService: HttpService,private _utility: UtilityModule,
    private nav: Router){
    this.UserModel = {} as UserModel;
  }
  ngOnInit() {
    this.usrModelStr = localStorage.getItem('UserModel');
    this.UserModel = JSON.parse(this.usrModelStr);
    if (this._utility.hasValue(this.UserModel) == false) {
      this._utility.AlertWarning("Please Login");
      this.nav.navigate(['/SignUpIn/true']);
      return;
    }

    this._httpService.Get("Form/GetUserFormCountMetaData?UserId=" + this.UserModel.user_id).subscribe(
      (response: any) => {
        this.formCount = response.data.totalForms;
        this.ActiveFormCount =response.data.activeForms;
        this.TotalFormSubmitionCount = response.data.totalFormSubmition;
        this.AverageFormSubmitionCount = response.data.averageSubmitionPerForm;
        this.HighestSubmitionCountFormName = response.data.highestSubmitionFormName;
        this.HighestFormSubmitionCount = response.data.highestSubmitionFormCount;

      },
      (error) => {
        this._utility.AlertWarning(error.error.message);
        // error
      });

  }
}
