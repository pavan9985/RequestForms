import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormCustomizationRoutingModule } from './form-customization-routing.module';
import { FormCustomizationDirectiveComponent } from './form-customization-directive/form-customization-directive.component';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { AddEditFormDirectiveComponent } from './add-edit-form-directive/add-edit-form-directive.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldDirectiveComponent } from './form-field-directive/form-field-directive.component';


@NgModule({
  declarations: [
    FormCustomizationDirectiveComponent,
    AddEditFormDirectiveComponent,
    FormFieldDirectiveComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormCustomizationRoutingModule
  ]
})
export class FormCustomizationModule { }
