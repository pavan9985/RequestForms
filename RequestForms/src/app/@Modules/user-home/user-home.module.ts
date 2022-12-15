import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeDirectiveComponent } from './user-home-directive/user-home-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';


@NgModule({
  declarations: [
    UserHomeDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserHomeRoutingModule
  ]
})
export class UserHomeModule { }
