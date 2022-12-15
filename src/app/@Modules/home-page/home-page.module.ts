import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageDirectiveComponent } from './home-page-directive/home-page-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';


@NgModule({
  declarations: [
    HomePageDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
