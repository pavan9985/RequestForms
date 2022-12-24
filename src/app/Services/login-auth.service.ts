import { Injectable } from '@angular/core';
import { UtilityModule } from '../Shared/utility/utility.module';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  // isLoggedIn = false;
  constructor(private _utilityModule: UtilityModule) { }
  isAuthenticated() {
    const data = localStorage.getItem("UserModel");
    if (this._utilityModule.hasValue(data)) {

      return true;
    }
    else {
      return false;
    }
  }
}
