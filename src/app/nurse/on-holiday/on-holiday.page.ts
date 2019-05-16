import { Component, OnInit } from '@angular/core';
import { Animation } from '@ionic/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service'
import { CustomvalidatorService } from '../../validator/customvalidator.service';
import { HelperService } from '../../services/helper.service';
import { HolidaysList } from '../../services/modal/holidays-list.model';
import * as moment from 'moment';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-on-holiday',
  templateUrl: './on-holiday.page.html',
  styleUrls: ['./on-holiday.page.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, display: 'block' })),
      state('closed', style({ opacity: 0, display: 'none' })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class OnHolidayPage implements OnInit {
  isOpen = false;
  holidayList?: HolidaysList | null;
  form: FormGroup;

  ValidationMessage: any = {
    //form one
    txtfromdate: [
      { type: 'required', message: 'From field is required' },
    ], txttodate: [
      { type: 'required', message: 'To field is required' },
    ]
  }

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    private helper: HelperService,
    public _fb: FormBuilder,
    public alertController: AlertController) {
    this.forminit();
  }
  toggle() {
    this.isOpen = !this.isOpen;
    this.forminit();
  }
  ngOnInit() {
    
  }
  ionViewDidEnter(){    
    this.getHolidays();
  }
  forminit() {
    this.form = this._fb.group({
      txtfromdate: ['', Validators.compose([Validators.required])],
      txttodate: ['', Validators.compose([Validators.required])]
    });
  }
  async getHolidays() {
    this.holidayList=null;
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });

   // await loading.present();

    this.api.holidayList().subscribe((res: any) => {
      if (res[0].success) {
        this.holidayList = res[0].data;
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }
      loading.dismiss();

    }, err => {
      loading.dismiss();
      this.helper.throwError(err.error.message)

    });
  }

  async create() {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass:'custom-loader-animation'
    });
    await loading.present();
    if (!this.form.valid) {
      CustomvalidatorService.validateAllFields(this.form);
      loading.dismiss();
      return
    }
    let paramx = this.form.value;
    paramx['txtfromdate'] = moment(paramx['txtfromdate'], 'YYYY-MM-DD').format('DD/MM/YYYY');
    paramx['txttodate'] = moment(paramx['txttodate'], 'YYYY-MM-DD').format('DD/MM/YYYY');

    this.api.addHoliday(paramx).subscribe(res => {
      if (res[0].success) {
        this.toggle();
        this.helper.presentToastWithOptions(res[0].message);
        this.getHolidays();
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }

      loading.dismiss();
    }, err => {
      this.helper.throwError(err.error.message)
      loading.dismiss();
    });
  }

  async deleteConfirm(data) {
    const alert = await this.alertController.create({
      cssClass: 'confirm_alert common-alert',
      mode: 'md',
      message: `<p class="bold" style="text-align: center;">Are you sure you want to delete this record?</p>`,
      // message: ` <p class="bold">You are accepting a <span>night shift</span> from <span>ABC Nursing Home for 28 Dec</span>  </p>
      // <p class="bold">The rate pay is <span>£20/hr</span>. Total payment for the shift<span> £240</span>. </p>
      // <p class="bold">By accepting this shift you agree to the Terms of work. </p>`,
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
              cssClass:'custom-loader-animation'
            });

            await loading.present();
            let params = {
              'holidayid': data.holidaysid
            }
            this.api.removeHoliday(params).subscribe(res => {
              if (res[0].success) {
                this.getHolidays();
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
