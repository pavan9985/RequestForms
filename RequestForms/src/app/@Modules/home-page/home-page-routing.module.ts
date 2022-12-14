import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageDirectiveComponent } from './home-page-directive/home-page-directive.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    
    path:"",
    component : HomePageDirectiveComponent,
    children:[
      {
        path: "main-view", component : HomePageDirectiveComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
