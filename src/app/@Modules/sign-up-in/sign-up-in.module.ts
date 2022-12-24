import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpInRoutingModule } from './sign-up-in-routing.module';
import { SignUpInDirectiveComponent } from './sign-up-in-directive/sign-up-in-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { LoginGuardGuard } from 'src/app/Services/login-guard.guard';
import { LoginAuthService } from 'src/app/Services/login-auth.service';


@NgModule({
  declarations: [
    SignUpInDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UtilityModule,
    SignUpInRoutingModule,
    ReactiveFormsModule
  ],
  providers:[LoginAuthService]
})
export class SignUpInModule { }
