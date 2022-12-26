import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageModule } from './@Modules/home-page/home-page.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './Shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityModule } from './Shared/utility/utility.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './Services/http.service';
import { LoaderService } from './Services/loader.service';
import { CustomHttpInterceptorInterceptor } from './Services/custom-http-interceptor.interceptor';

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
  
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
