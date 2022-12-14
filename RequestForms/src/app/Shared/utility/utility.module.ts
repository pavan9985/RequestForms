import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UtilityModule { 

  hasValue(input :any){
    if(input != null && input != undefined && input != ''){
      return true;
    }
    else{
      return false;
    }
  }
}
