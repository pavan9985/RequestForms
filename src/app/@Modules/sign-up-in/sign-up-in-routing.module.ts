import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpInDirectiveComponent } from './sign-up-in-directive/sign-up-in-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : SignUpInDirectiveComponent,
    children:[
      {
        path: "main-view", component : SignUpInDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpInRoutingModule { }
