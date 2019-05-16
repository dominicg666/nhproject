import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from "@angular/router";
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HelperService } from '../services/helper.service';
import { CustomvalidatorService } from '../validator/customvalidator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  ValidationMessage: any = {
    //form one
    email: [
      { type: 'required', message: 'The email field is required' },
      { type: 'pattern', message: 'please enter valid email' },
    ], password: [
      { type: 'required', message: 'The password field is required' },
    ]
  }
  subscription: any;
  public counter = 0;
  keyboardStyle = { width: '100%', height: '0px' };
  constructor(private router: Router, public menuCtrl: MenuController, public loadingController: LoadingController, private api: ApiService, private helper: HelperService, private platform: Platform, private oneSignal: OneSignal, public _fb: FormBuilder, private keyboard: Keyboard, public toastCtrl: ToastController) {
    this.formInit();
    this.keyboard.onKeyboardWillShow().subscribe({
      next: x => {
        this.keyboardStyle.height = x.keyboardHeight + 'px';
      },
      error: e => {
        console.log(e);
      }
    });
    this.keyboard.onKeyboardWillHide().subscribe({
      next: x => {
        this.keyboardStyle.height = '0px';
      },
      error: e => {
        console.log(e);
      }
    });
  }
  public focusInput(event): void {
    let total = 0;
    let container = null;

    const _rec = (obj) => {
      total += obj.offsetTop;
      const par = obj.offsetParent;
      if (par && par.localName !== 'ion-content') {
        _rec(par);
      } else {
        container = par;
      }
    };
    _rec(event.target);
    setTimeout(() => {
      container.scrollToPoint(0, total - 50, 300);
    }, 500);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'sidemenu');
    this.subscription = this.platform.backButton.subscribe(async () => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 1000)
      } else {
        // console.log("exitapp");
        navigator['app'].exitApp();
      }
    });
  }
  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: "Press again to exit",
      duration: 1000,
      mode: 'ios',
      position: 'bottom',
    });
    toast.present();
  }
  ionViewDidLeave() { this.subscription.unsubscribe(); }

  formInit() {
    this.form = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      password: ['', Validators.compose([Validators.required,])]
    });
  }
  async login() {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    if (!this.form.valid) {
      CustomvalidatorService.validateAllFields(this.form);
      loading.dismiss();
      return;
    }
    this.api.login({
      ...this.form.value
    }).subscribe(res => {
      if (res[0].success) {
        this.helper.setLocalStorage(res[0].data);
        this.oneSignalInit();
        this.formInit();
        if (res[0].data.userdata.usertype == 1 || res[0].data.userdata.usertype == 2) {
          if (res[0].data.userdata.firstname == null || res[0].data.userdata.postcode == null) {
            this.router.navigate(['/register'])
          } else {
            this.router.navigate(['/nurse']);
          }
        } else {
          if (res[0].data.userdata.firstname == null || res[0].data.userdata.postcode == null) {
            this.router.navigate(['/register'])
          }
        }

      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();
    }, err => {
      // if (typeof err.error.message.email != "undefined" && typeof err.error.message.password != "undefined") {
      //   this.helper.presentToastWithOptions(err.error.message.email + err.error.message.password)
      // } else if (typeof err.error.message.email != "undefined") {
      //   this.helper.presentToastWithOptions(err.error.message.email)
      // } else if (typeof err.error.message.password != "undefined") {
      //   this.helper.presentToastWithOptions(err.error.message.password)
      // } else {
      //   this.helper.presentToastWithOptions(err.error.message)
      // }
      if (typeof err.error != "undefined") {
        if (typeof err.error.message != "undefined") {
          this.helper.presentToastWithOptions(err.error.message)
        }
      }

      loading.dismiss();
    });

    // if(this.email=="admin"){
    //   this.router.navigate(['/care-home'])
    // }else{
    //   this.router.navigate(['/nurse'])
    // }
  }
  getPlayerId() {

  }

  oneSignalInit() {
    if (this.platform.is('android') || this.platform.is('ios') || this.platform.is('cordova')) {
      this.oneSignal.startInit('2566c70f-0aac-4623-8b11-4a0d14c0605f', '926803640097');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.getIds().then((ids) => {
        let playerID = ids['userId'];
        console.log(playerID);
        this.api.playerIds({
          playerid: playerID
        }).subscribe((data) => {

        })
      })

      this.oneSignal.endInit();
    }
  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

}
