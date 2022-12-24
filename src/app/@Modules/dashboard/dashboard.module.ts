import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDirectiveComponent } from './dashboard-directive/dashboard-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { FormCustomizationModule } from '../form-customization/form-customization.module';
import { LoginAuthService } from 'src/app/Services/login-auth.service';
import { LoginGuardGuard } from 'src/app/Services/login-guard.guard';


@NgModule({
  declarations: [
    DashboardDirectiveComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule
  ],
  providers:[LoginAuthService, LoginGuardGuard]
})
export class DashboardModule { }
