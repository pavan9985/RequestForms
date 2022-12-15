import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormCustomizationDirectiveComponent } from './form-customization-directive/form-customization-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : FormCustomizationDirectiveComponent,
    children:[
      {
        path: "main-view", component : FormCustomizationDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormCustomizationRoutingModule { }
