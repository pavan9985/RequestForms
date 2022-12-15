import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeDirectiveComponent } from './user-home-directive/user-home-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : UserHomeDirectiveComponent,
    children:[
      {
        path: "main-view", component : UserHomeDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserHomeRoutingModule { }
