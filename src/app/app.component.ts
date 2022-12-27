import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './Services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Request-Forms';

  constructor(private nav: Router, public _loaderService: LoaderService){}
  ngOnInit() {
    this.nav.navigate(['/HomePage']);
    // this._loaderService.hide();
   }
}
