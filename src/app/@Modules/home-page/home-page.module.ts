import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageDirectiveComponent } from './home-page-directive/home-page-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { LoaderService } from 'src/app/Services/loader.service';


@NgModule({
  declarations: [
    HomePageDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomePageRoutingModule
  ],
  providers:[LoaderService]
})
export class HomePageModule { }
