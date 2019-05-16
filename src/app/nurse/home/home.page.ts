import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ApiService } from '../../services/api.service'
import { HelperService } from '../../services/helper.service';
import { AvaiableworksdataEntity } from '../../services/modal/available-works-data-entity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ 'transition-delay': '0.2s', transition: 'all 0.2s ease-in', opacity: 1, visibility: 'visible', top: '142px' })),
      state('closed', style({ 'transition-delay': '0.2s', opacity: 0, transition: 'all 0.3s ease-in', top: '136px', visibility: 'hidden' })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('fadeIn', [
      state('open', style({ transition: 'all 0.2s ease-in', height: '253px' })),
      state('closed', style({ 'transition-delay': '0.2s', transition: 'all 0.2s ease-in',})),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
    trigger('animationHeader', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('itemFadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class HomePage implements OnInit {
  isSliderActive = false;
  user
  worksdataEntity?: (AvaiableworksdataEntity)[] | null;
  worksdataEntityflag = 0;
  myradiusBinding: any = 10;
  pageOffset = 1;
  subscription: any;
  public counter = 0;
  constructor(public alertController: AlertController, public toastCtrl: ToastController, public api: ApiService, private helper: HelperService, public loadingController: LoadingController, private router: Router, private platform: Platform) { }

  ngOnInit() {
    this.worksdataEntity = null;
    this.initList();
  }
  doRefresh(event) {
    this.getMyjobs(event);
  }
  initList() {
    this.api.userData$.subscribe(data => {
      this.worksdataEntity = null;
      if (data != null) {
        this.getMyjobs()
        this.myradiusBinding = 10;
      }
    });
  }
  ionViewDidEnter() {
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
  async getMyjobs(event = null) {
    if (this.api.uData != null && this.api.uData.userdata.myworkradious != null) {
      //this.myradiusBinding = this.api.uData.userdata.myworkradious;
    }
    this.pageOffset = 1;

    this.api.nurseMyjobs(
      {
        params: {
          myradius: this.myradiusBinding,
          _offset: 0,
          _limit: 10,
        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.worksdataEntity = res[0].data.avaiableworksdata;
      } else {
        this.worksdataEntity = [];
        this.helper.presentToastWithOptions(res[0].message)
      }
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      if (event != null) {
        event.target.complete();
      }
      this.worksdataEntity = [];
      // this.helper.throwError(err.error.message)

    });
  }
  changeRange() {
    this.isSliderActive = false;
    this.worksdataEntity = null;
    this.pageOffset = 1;
    this.api.nurseMyjobs(
      {
        params: {
          myradius: this.myradiusBinding,
          _offset: 0,
          _limit: 10,

        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.worksdataEntity = res[0].data.avaiableworksdata;
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
        this.worksdataEntity = [];
      }

    }, err => {
      //this.helper.throwError(err.error.message)
      this.worksdataEntity = [];

    });

  }

  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.nurseMyjobs(
      {
        params: {
          myradius: this.myradiusBinding,
          _offset: this.pageOffset,
          _limit: 10,

        }
      }, true
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.avaiableworksdata) {
          this.worksdataEntity.push(option);
        }
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
      }
      if (res[0].data.avaiableworksdata.length == 0) {
        //infiniteScroll.target.disabled = true;
        this.pageOffset = this.pageOffset - 10;
      }
      infiniteScroll.target.complete();

    }, err => {
      //this.helper.throwError(err.error.message)
      infiniteScroll.target.complete();
    });
  }
  jobDetails(option: AvaiableworksdataEntity) {
    this.router.navigate(['/nurse/tabs/home/detail/' + option.jobid])
    ///nurse/tabs/home/detail
  }
  showDistanceSlider() {
    this.isSliderActive = !this.isSliderActive;
  }
  changeEvent() {
    // alert(0);
  }
  async accept(option: AvaiableworksdataEntity) {
    const alert = await this.alertController.create({
      cssClass: 'confirm_alert common-alert accept-job',
      mode: 'md',
      message: ` <p class="bold">You are accepting a <span>${option.jobname}</span> from <span>${option.nursinghomename}</span>  </p>
      <p class="bold">The rate pay is <span>£${option.hourlyrate}/hr</span>. Total payment for the shift is <span> £${option.shiftrate}</span>. </p>
      <p class="bold">Cancellation charge of £25 will apply if you cancel this shift. </p>
      <p class="bold">By Accepting this shift, you agree to the Terms & Conditions. </p>`,
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'primary',
          handler: async (blah) => {
            const loading = await this.loadingController.create({
              message: '',
              spinner: null,
              cssClass: 'custom-loader-animation'
            });

            await loading.present();

            this.api.acceptJobWork(
              {
                jobid: option.jobid
              }
            ).subscribe((res: any) => {
              if (res[0].success) {
                this.helper.presentToastWithOptions(res[0].message)
                this.getMyjobs();
              } else {
                this.helper.presentToastWithOptions(res[0].message)
              }
              loading.dismiss();

            }, err => {
              loading.dismiss();
              this.helper.throwError(err.error.message)

            });
          }
        }
      ]
    });

    await alert.present();
  }

  isCollapaseHeader = true;
  scrollValue = 0;
  isScrolling(event) {
    this.isSliderActive = false;
    // if (this.scrollValue < event.detail.currentY) {
    //   this.isCollapaseHeader = false;
    //   this.scrollValue = event.detail.currentY;
    // } else {
    //   this.isCollapaseHeader = true;
    //   this.scrollValue = event.detail.currentY;
    // }
  }

}
export function alertEnterANimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  wrapperAnimation.addElement(baseEl.querySelector('.alert-wrapper'));

  wrapperAnimation.beforeStyles({ 'opacity': 1 })
    .fromTo('translateY', '100%', '0%');

  backdropAnimation.fromTo('opacity', 0.01, 0.4);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('cubic-bezier(0.36,0.66,0.04,1)')
    .duration(400)
    .beforeAddClass('show-modal')
    .add(backdropAnimation)
    .add(wrapperAnimation));

}

export function alertLeaveAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  const wrapperEl = baseEl.querySelector('.alert-wrapper');
  wrapperAnimation.addElement(wrapperEl);
  const wrapperElRect = wrapperEl!.getBoundingClientRect();

  wrapperAnimation.beforeStyles({ 'opacity': 1 })
    .fromTo('translateY', '0%', `${window.innerHeight - wrapperElRect.top}px`);

  backdropAnimation.fromTo('opacity', 0.4, 0.0);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('ease-out')
    .duration(250)
    .add(backdropAnimation)
    .add(wrapperAnimation));

}
