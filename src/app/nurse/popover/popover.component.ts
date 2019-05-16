import { Component, OnInit } from '@angular/core';
import { Animation } from '@ionic/core';
import { Router } from '@angular/router';
import { PopoverController,NavController,AlertController,ModalController,ActionSheetController,NavParams } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ApiService } from '../../services/api.service';
import { HelperService } from '../../services/helper.service';
import { UpcomingShift, JobdataEntity } from '../../services/modal/upcoming-shifs.model';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  popoverParams: any;
  pop: PopoverController;
  popOverExist:boolean=false;
  Jobdata?:JobdataEntity | null;
  constructor(public viewCtrl: ModalController, public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private router: Router, private callNumber: CallNumber,
    public api: ApiService, private navCtrl: NavController,public helper:HelperService) {
      this.pop = this.navParams.get('popoverController');
      this.helper.existPopover=false;

  }

  ngOnInit() {
    
  }
  async  moreinfo(){
    if(this.helper.existPopover){
      await  this.pop.dismiss()
    }
    this.Jobdata =  this.navParams.get('optData');
    this.navCtrl.navigateForward('/nurse/tabs/myshifts/upcoming/details/' + this.Jobdata.jobid);
  }
  async cancelshift() {
    if(this.helper.existPopover){
      await  this.pop.dismiss()
    }
    this.navParams.get('data_value');
    this.Jobdata =  this.navParams.get('optData');
    const alert = await this.alertController.create({
      header: 'Cancel shift-' + ' ' + this.Jobdata.nursinghomename,
      cssClass: 'confirm_alert common-alert',
      mode: 'md',
      message: `<div class="warning"> <ion-icon name="ios-information-circle-outline" role="img" class="hydrated" aria-label="information circle outline"></ion-icon> <strong>Cancellations within 12 hours of the commencement of the shift will carry a penalty of £25 and will add a negative Reliability Grade for you.</strong></div><p class="text-info">Multiple cancellations will necessitate the removal of your profile from Nursely platform. 
      Please See the Cancellation Policy on our Terms & Conditions page. 
      If you still want to cancel, please click the below button to call Nursely. </p>`,
      enterAnimation: alertEnterANimation,
      leaveAnimation: alertLeaveAnimation,
      buttons: [
        {
          text: 'Call Nursely',
          cssClass: 'primary',
          handler: (blah) => {
            this.callNumber.callNumber('02039928672', true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
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

