import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDirectiveComponent } from './dashboard-directive/dashboard-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { FormCustomizationModule } from '../form-customization/form-customization.module';


@NgModule({
  declarations: [
    DashboardDirectiveComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
