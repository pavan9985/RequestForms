import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageModule } from './@Modules/home-page/home-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './Shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityModule } from './Shared/utility/utility.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './Services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    UtilityModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
