import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../Models/sign-up-in.model';
import { UtilityModule } from '../Shared/utility/utility.module';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL: string = 'http://ec2-35-154-74-19.ap-south-1.compute.amazonaws.com:4411/api/';
  userModelstr: any;
  UserModel: UserModel;
  //URL :string='http://localhost:6802/api/';
  headers: any;
  constructor(private _http: HttpClient, private _utility: UtilityModule, private _loaderService: LoaderService, private nav: Router) {
    this.UserModel = {} as UserModel;
  }

  Post(endPoint: string, req: any) {
    if (endPoint != "User/Login" && endPoint != "User/SignUp") {
      this.userModelstr = localStorage.getItem('UserModel');

      if (this._utility.hasValue(this.userModelstr) == false) {
        this.nav.navigate(['/SignUpIn/false']);
      }
      this.UserModel = JSON.parse(this.userModelstr);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.UserModel.token });
    }
    else {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    const params = new HttpParams({ fromObject: req });
    this._loaderService.show();
    return this._http.post(this.URL + endPoint, req, { headers: this.headers });
  }

  Get(endPoint: string){
    if (endPoint != "User/Login" && endPoint != "User/SignUp") {
      this.userModelstr = localStorage.getItem('UserModel');

      if (this._utility.hasValue(this.userModelstr) == false) {
        this.nav.navigate(['/SignUpIn/false']);
      }
      this.UserModel = JSON.parse(this.userModelstr);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.UserModel.token });
    }
    else {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this._http.get(this.URL + endPoint, { headers: this.headers });
  }

  Delete(endPoint:any){
    if (endPoint != "User/Login" && endPoint != "User/SignUp") {
      this.userModelstr = localStorage.getItem('UserModel');

      if (this._utility.hasValue(this.userModelstr) == false) {
        this.nav.navigate(['/SignUpIn/false']);
      }
      this.UserModel = JSON.parse(this.userModelstr);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.UserModel.token });
    }
    else {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    return this._http.delete(this.URL + endPoint, { headers: this.headers });
  }

}
