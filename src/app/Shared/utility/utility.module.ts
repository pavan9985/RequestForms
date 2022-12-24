import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UtilityModule { 

  constructor(private _snackBar: MatSnackBar) {
    
    // console.log(this.dispalay);
   }
   
  hasValue(input :any){
    if(input != null && input != undefined && input != ''){
      return true;
    }
    else{
      return false;
    }
  }

  AlertWarning(message:string){
    this._snackBar.open(message, "Ok",{
      duration: 5000,
      panelClass : ['mb-4']
    });
  }
}
