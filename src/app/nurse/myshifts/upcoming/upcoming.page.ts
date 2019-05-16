import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component';
import { ApiService } from '../../../services/api.service'
import { HelperService } from '../../../services/helper.service';
import { UpcomingShift, JobdataEntity } from '../../../services/modal/upcoming-shifs.model';

// import {}
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
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
export class UpcomingPage implements OnInit {

  currentTab = 'upcoming';
  data: any;
  pop: any;
  pageOffset = 1;
  upcomingList?: (UpcomingShift) | null;
  jobid: any;
  constructor(public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private router: Router, private nativePageTransitions: NativePageTransitions, public popoverController: PopoverController, public api: ApiService, public loadingController: LoadingController, private helper: HelperService, private activeRoute: ActivatedRoute) {
    this.pop = popoverController;
  }

  ngOnInit() {
    this.upcomingList = null;
    this.jobid = this.activeRoute.snapshot.params.jobid;
    if (this.jobid === null || this.jobid === undefined || this.jobid === "undefined" || this.jobid === '') {
      this.getUpcomingShits();
    }
  }
  ionViewDidEnter() {
    this.jobid = this.activeRoute.snapshot.params.jobid
    if (this.jobid !== null && this.jobid !== undefined && this.jobid !== "undefined" && this.jobid !== '') {
      this.getUpcomingShits();
    }

  }
  doRefresh(event) {
    this.jobid = '';
    this.getUpcomingShits(event);
  }

  async getUpcomingShits(event = null) {
    this.pageOffset = 1;
    let params = {
      _offset: 0,
      _limit: 10
    }
    if (this.jobid !== null && this.jobid !== undefined && this.jobid !== "undefined" && this.jobid !== '') {
      params['jobid'] = this.jobid;
    }
    this.api.upcomingShifts(
      {
        params: params
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.upcomingList = res[0].data;
      } else {
        //this.helper.presentToastWithOptions(res[0].message)
        this.upcomingList = {
          jobdata: [],
          myshiftstatistics: [],
          timenow: null
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
        this.upcomingList = err.error.data;
      }
      // this.helper.throwError(err.error.message)
      this.upcomingList = {
        jobdata: [],
        myshiftstatistics: [],
        timenow: null
      };

    });
  }

  loadMore(infiniteScroll) {
    this.pageOffset = this.pageOffset + 10;
    this.api.upcomingShifts(
      {
        params: {
          _offset: this.pageOffset,
          _limit: 10,

        }
      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        for (let option of res[0].data.jobdata) {
          this.upcomingList.jobdata.push(option);
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

  myswipeleft() {
    const options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      // slidePixels: 20,
      iosdelay: 50,
      // androiddelay: 150,
      // fixedPixelsTop: 0,
      // fixedPixelsBottom: 60
    };
    this.nativePageTransitions.slide(options).then(data => data)
      .catch(err => err);
    this.router.navigate(['/nurse/tabs/myshifts/completed']);
  }
  async presentPopover(ev: any, optData: JobdataEntity) {
    const target = event.target || event.srcElement || event.currentTarget;
    const input = target as HTMLInputElement;
    const id = input.id;
    const value = input.attributes[4].value;
    // var value = idAttr.nodeValue;
    let data = { data_value: value, data_id: id, popoverController: this.popoverController, optData: optData };
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: data,
      event: ev,
      showBackdrop: false,
      mode: 'md',
      translucent: true,
      cssClass: 'upcoming-popover-custom'
    });
    popover.present();
    popover.onDidDismiss().then(() => {
      this.helper.existPopover = false;
    })
    this.helper.existPopover = true;
  }


  async confirmAlert(option: JobdataEntity, status) {
    let message = ``;
    let header = ``;
    if (status == 13) {
      message = `I confirm my availability for this shift.`
      header = `Confirm`;
    } else {
      message = `I confirm my availability for this shift.`
      header = `On the way`;
    }
    const alert = await this.alertController.create({
      header: header,
      cssClass: 'confirm_alert common-alert',
      mode: 'md',
      message: `<p>${message} </p>`,
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'primary',
          handler: (blah) => {
            this.changeStatus(option, status);
          }
        }
      ]
    });

    await alert.present();

  }
  async changeStatus(option: JobdataEntity, status) {

    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });

    await loading.present();

    this.api.completeWork(
      {
        workstatus: status,
        jobworkid: option.jobworkid

      }
    ).subscribe((res: any) => {
      if (res[0].success) {
        this.getUpcomingShits();
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

  async signOffPending(option: JobdataEntity) {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Please mention if you have worked any extra hours.',
      inputs: [{
        name: 'workhours',
        type: 'number',
        placeholder: 'Total Working Hours'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //  console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Submit',
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
                extrahours: data.workhours

              }
            ).subscribe((res: any) => {
              if (res[0].success) {
                this.getUpcomingShits();
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
