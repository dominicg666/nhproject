import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ContactsModel } from '../../services/modal/contacts.model';
import { ApiService } from '../../services/api.service'
import { HelperService } from '../../services/helper.service'

@Component({
  selector: 'app-refer-a-friend',
  templateUrl: './refer-a-friend.page.html',
  styleUrls: ['./refer-a-friend.page.scss'],
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
export class ReferAFriendPage implements OnInit {
  contactlist: any = [
    {
      'displayName': 'name 2',
      'phoneNumbers': '9874563210'
    },
    {
      'displayName': 'name 1',
      'phoneNumbers': '9874563210'
    },
  ];
  contcatSearchFliter: any;
  constructor( public api: ApiService ,private toastCtrl: ToastController, private platform: Platform, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing) {

  }
  searchContacts: any = false;
  ngOnInit() {
  }
  openContacts() {
   

  }

  async inviteFriendActionsheet(option) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share Link',
      cssClass: 'share-action-sheet',
      buttons: [{
        text: 'Share to Invite',
        icon: 'md-chatbubbles',
        cssClass: 'share-action-sheet-sms',
        handler: () => {
          console.log('Delete clicked');
          this.socialSharing.shareViaSMS('This is an amazing app for nurses and carers to earn more and have full flexibility and control. Sign up on www.nursely.co.uk', null).then(() => {
            // Success!
          }).catch(() => {
            // Error!
          });
        }
      }, {
        text: 'WhatsApp',
        icon: 'logo-whatsapp',
        cssClass: 'share-action-sheet-whats-app',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.shareViaWhatsApp('This is an amazing app for nurses and carers to earn more and have full flexibility and control. Sign up on www.nursely.co.uk').then(() => {
            // Success!
          }).catch(() => {
            // Error!
          });
        }
      }]
    });
    await actionSheet.present();
  }



}

