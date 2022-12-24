import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from 'src/app/Services/login-guard.guard';
import { FormCustomizationDirectiveComponent } from '../form-customization/form-customization-directive/form-customization-directive.component';
import { DashboardDirectiveComponent } from './dashboard-directive/dashboard-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : DashboardDirectiveComponent,
    canActivate:[LoginGuardGuard],
    children:[
      {
        path:'FormCustomization',
        loadChildren : () =>
          import('../form-customization/form-customization.module').then((m) => m.FormCustomizationModule),
      },
      {
        path:'UserHome',
        loadChildren : () =>
          import('../user-home/user-home.module').then((m) => m.UserHomeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
