import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-home-page-directive',
  templateUrl: './home-page-directive.component.html',
  styleUrls: ['./home-page-directive.component.scss']
})
export class HomePageDirectiveComponent implements OnInit {
  constructor(private _LoaderService:LoaderService){
    
  }

  ngOnInit() {
    this._LoaderService.hide();
  }
}
