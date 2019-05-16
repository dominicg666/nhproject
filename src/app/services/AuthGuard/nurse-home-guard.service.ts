import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoadingController } from '@ionic/angular';
import { HelperService } from '../../services/helper.service';
import { ApiService } from '../../services/api.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseHomeGuardService implements CanActivate {

  constructor(private router: Router, private helper: HelperService, public api: ApiService, public loadingController: LoadingController) {

  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let user = this.helper.getLocalStorage();
    console.log(user);
    if (user != null) {
      if (user.userdata.usertype == 3 || user.userdata.usertype == 9 || user.userdata.usertype == 10) {
        if (user.userdata.firstname == null || user.userdata.postcode == null) {
          this.router.navigate(['/register']);
        } else {
          const loading = await this.loadingController.create({
            message: '',
            spinner: null,
            cssClass: 'custom-loader-animation'
          });

          //await loading.present();
          this.api.nurseHomeProfile().subscribe((res: any) => {

            if (res[0].success) {
              this.api.setHomeData(res[0].data)

            } else {
              this.helper.clearLocalStorage();
              this.router.navigate(['login']);
            }
            loading.dismiss();

          }, err => {
            loading.dismiss();
            // this.helper.clearLocalStorage();
            this.helper.clearLocalStorage();
            this.router.navigate(['login']);

          });
        }
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;

  }
}
