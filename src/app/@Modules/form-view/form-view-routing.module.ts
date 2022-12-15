import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormViewDirectiveComponent } from './form-view-directive/form-view-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : FormViewDirectiveComponent,
    children:[
      {
        path: "main-view", component : FormViewDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormViewRoutingModule { }
