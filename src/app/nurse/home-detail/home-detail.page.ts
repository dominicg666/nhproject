import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { Animation } from '@ionic/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { WorksDetails,AvaiableworksdataEntity } from '../../services/modal/works-details.model';
import { ApiService } from '../../services/api.service'
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.page.html',
  styleUrls: ['./home-detail.page.scss'],
  
  animations: [
    trigger('animationHeader', [      
      transition(':enter', [
        style({ opacity: 0}),
          animate('500ms', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
          animate('0ms', style({ opacity: 0}))
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
export class HomeDetailPage implements OnInit {
  worksdataEntity?: (WorksDetails) | null;
  routeParams:any
  constructor( private activeRoute: ActivatedRoute, public api: ApiService,public loadingController: LoadingController, public  helper: HelperService,private router: Router,public alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.routeParams = this.activeRoute.snapshot.params;
  }
  ionViewDidEnter(){
   this.getJobDetails();
  }
  backNavigation(){
    this.navCtrl.navigateBack('/nurse/tabs/home');
  }
  async getJobDetails(){
    this.api.nurseMyjobDetails( {
      params: {
        jobid: this.routeParams.jobid
    }
  }).subscribe((res: any) => {
      if (res[0].success) {
        this.worksdataEntity = res[0].data;
        console.log(this.worksdataEntity);
      } else {
        this.helper.presentToastWithOptions(res[0].message)
      }

    }, err => {
      this.helper.throwError(err.error.message)

    });
  }
  async accept(option: AvaiableworksdataEntity) {
    const alert = await this.alertController.create({
      cssClass: 'confirm_alert common-alert accept-job',
      mode: 'md',
      message: ` <p class="bold">You are accepting a <span>${option.jobname}</span> from <span>${option.nursinghomename}</span>  </p>
      <p class="bold">The rate pay is <span>£${option.hourlyrate}/hr</span>. Total payment for the shift<span> £${option.shiftrate}</span>. </p>
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
              cssClass:'custom-loader-animation'
            });

            await loading.present();

            this.api.acceptJobWork(
              {
                jobid: this.routeParams.jobid
              }
            ).subscribe((res: any) => {
              if (res[0].success) {
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



  backgroudHeaderColor = 'transparent';
  isScrolling(event) {
    if (event.detail.currentY>190) {
      this.backgroudHeaderColor='#265197'
    } else {
      this.backgroudHeaderColor='transparent'
    }
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
