import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { HelperService } from '../helper.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private helper: HelperService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let user = this.helper.getLocalStorage();
    if (user == null) {
      return true;
    }
    if (user.userdata.usertype == 1 || user.userdata.usertype == 2) {
      this.router.navigate(['nurse']);
    } else if (user.userdata.usertype == 3 || user.userdata.usertype == 9 || user.userdata.usertype == 10) {
      this.router.navigate(['care-home']);
    }
    return false;

  }
}
