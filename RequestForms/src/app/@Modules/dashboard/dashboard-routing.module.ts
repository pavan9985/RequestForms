import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDirectiveComponent } from './dashboard-directive/dashboard-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : DashboardDirectiveComponent,
    children:[
      {
        path: "main-view", component : DashboardDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
