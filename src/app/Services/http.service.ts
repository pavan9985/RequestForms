import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL :string='http://ec2-35-154-74-19.ap-south-1.compute.amazonaws.com:4411/api/';
  // URL :string='http://localhost:6802/api/';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private _http: HttpClient, private _loaderService: LoaderService) { }

  Post(endPoint:string,req:any){
    const params = new HttpParams({fromObject:req});
    this._loaderService.show();
    return  this._http.post(this.URL +endPoint, req, { headers :this.headers });
  }


}
