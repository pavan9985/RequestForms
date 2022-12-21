import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormViewRoutingModule } from './form-view-routing.module';
import { FormViewDirectiveComponent } from './form-view-directive/form-view-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { UtilityModule } from 'src/app/Shared/utility/utility.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormViewDirectiveComponent
  ],
  imports: [
    CommonModule,
    FormViewRoutingModule,
    MaterialModule,
    UtilityModule,
    ReactiveFormsModule
  ]
})
export class FormViewModule { }
