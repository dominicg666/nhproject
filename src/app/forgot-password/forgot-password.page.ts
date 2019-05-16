import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})

export class ForgotPasswordPage implements OnInit {
  email:any;
  constructor(private router: Router, public menuCtrl: MenuController, public loadingController: LoadingController, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
  }
  async submit(){
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });

    await loading.present();

    this.api.forgetPassword({email:this.email}).subscribe(res => {
      if (res[0].success) {
        this.helper.presentToastWithOptions("Password reset link is send to your email");     
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });

  }

}
