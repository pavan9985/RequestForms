import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormViewRoutingModule } from './form-view-routing.module';
import { FormViewDirectiveComponent } from './form-view-directive/form-view-directive.component';


@NgModule({
  declarations: [
    FormViewDirectiveComponent
  ],
  imports: [
    CommonModule,
    FormViewRoutingModule
  ]
})
export class FormViewModule { }
