import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpInRoutingModule } from './sign-up-in-routing.module';
import { SignUpInDirectiveComponent } from './sign-up-in-directive/sign-up-in-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';


@NgModule({
  declarations: [
    SignUpInDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SignUpInRoutingModule
  ]
})
export class SignUpInModule { }
