import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageDirectiveComponent } from './@Modules/home-page/home-page-directive/home-page-directive.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {path: "", redirectTo:""},

  {
    path: '',
    component : AppComponent,
    children :[
      {
        path:'SignUpIn/:id',
        loadChildren : () =>
          import('./@Modules/sign-up-in/sign-up-in.module').then((m) => m.SignUpInModule),
          // data : {some_data: 'some value'}
      },
      {
        path:'HomePage',
        loadChildren : () =>
          import('./@Modules/home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path:'FormView',
        loadChildren : () =>
          import('./@Modules/form-view/form-view.module').then((m) => m.FormViewModule),
      },
      {
        path:'Dashboard',
        loadChildren : () =>
          import('./@Modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
          // data : {some_data: 'some value'}
      }
      
      
    ]
  },
  { path: "**", redirectTo: "", component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
