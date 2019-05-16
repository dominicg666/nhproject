import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { HelperService } from '../../../services/helper.service';
import { CompletedShift, JobdataEntity } from '../../../services/modal/completed-shifts.model';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
  animations: [
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
export class CompletedPage implements OnInit {

  currentTab: string = "completed";

  completedList?: (CompletedShift) | null;
  pageOffset = 1;
  jobid: any;
  constructor(public alertController: AlertController, private router: Router, public api: ApiService, public loadingController: LoadingController, private helper: HelperService, private nativePageTransitions: NativePageTransitions, private activeRoute: ActivatedRoute) { }

  ionViewDidEnter() {
    this.jobid = this.activeRoute.snapshot.params.jobid
    if (this.jobid !== null && this.jobid !== undefined && this.jobid !== "undefined" && this.jobid !== '') {
      this.getCompletedShits();
    }
  }
  ngOnInit() {
    this.completedList = null;
    this.jobid = this.activeRoute.snapshot.params.jobid;
    if (this.jobid === null || this.jobid === undefined || this.jobid === "undefined" || this.jobid === '') {
      this.getCompletedShits();
    }
  }
  doRefresh(event) {
    this.jobid = '';
    this.getCompletedShits(event);
  }
  async getCompletedShits(event = null) {
    this.pageOffset = 1;
    let params = {
      _offset: 0,
      _limit: 10
    }
    if (this.jobid !== null && this.jobid !== undefined && this.jobid !== "undefined" && this.jobid !== '') {
      params['jobid'] = this.jobid;
    }
    this.api.completedShifts(
      {
        params: params
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.completedList = res[0].data;
      } else {
        // this.helper.presentToastWithOptions(res[0].message)
        this.completedList = {
          jobdata: []
        };
      }
      if (event != null) {
        event.target.complete();
      }

    }, err => {
      if (event != null) {
        event.target.complete();
      }
      if (err.error.data != undefined && typeof err.error.data == "object") {
        this.completedList = err.error.data;
      } else {
        this.completedList = {
          jobdata: []
        };
      }

      //this.helper.throwError(err.error.message)

    });
  }

  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.completedShifts(
      {
        params: {
          _offset: this.pageOffset,
          _limit: 10,

        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.jobdata) {
          this.completedList.jobdata.push(option);
        }
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
      }
      if (res[0].data.jobdata.length == 0) {
        //infiniteScroll.target.disabled = true;
        this.pageOffset = this.pageOffset - 10;
      }
      infiniteScroll.target.complete();

    }, err => {
      //this.helper.throwError(err.error.message)
      infiniteScroll.target.complete();
    });
  }

  async signoffOne(option: JobdataEntity) {
    const alert = await this.alertController.create({
      header: 'Sign off',
      cssClass: 'confirm_alert common-alert sign-off',
      mode: 'md',
      message: '<p>If you have worked any extra hours, <a id="signoff">please tap here.</a> </p>',
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
    });

    await alert.present().then(data => {
      let _self = this;
      document.getElementById('signoff').addEventListener('click', function () {
        alert.dismiss();
        _self.signoff(option);
      });
    });
  }
  async signoff(option: JobdataEntity) {
    const alert = await this.alertController.create({
      header: 'Sign off',
      cssClass: 'confirm_alert common-alert sign-off',
      mode: 'md',
      message: '<p>You are sending this to the Shift Manager for sign-off. <br/> <br/>Enter extra hours worked, if any (Enter only if you have worked more then 30 mins extra time).</p>',
      inputs: [{
        name: 'workhours',
        type: 'number',
        placeholder: 'Hours',
        max: 12
      }, {
        name: 'workminute',
        type: 'number',
        placeholder: 'Minutes',
        max: 60
      }],
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Send',
          cssClass: 'primary',
          handler: async (data) => {

            const loading = await this.loadingController.create({
              message: '',
              spinner: null,
              cssClass: 'custom-loader-animation'
            });

            await loading.present();

            this.api.completeWork(
              {
                workstatus: 5,
                jobworkid: option.jobworkid,
                extrahours: data.workhours,
                extraminutes: data.workminute

              }
            ).subscribe((res: any) => {
              if (res[0].success) {
                this.getCompletedShits();
                this.helper.presentToastWithOptions(res[0].message)
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


  myswiperight() {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 500
    }
    this.nativePageTransitions.slide(options).then(data => data)
      .catch(err => err);
    this.router.navigate(['/nurse/tabs/myshifts/upcoming']);
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

