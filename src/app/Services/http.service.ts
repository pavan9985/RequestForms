import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL :string='http://ec2-35-154-74-19.ap-south-1.compute.amazonaws.com:4411/api/';
  // URL :string='http://localhost:6802/api/';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  Post(endPoint:string,req:any){
    const params = new HttpParams({fromObject:req});
    
    return  this.http.post(this.URL +endPoint, req, { headers :this.headers });
  }


}
