import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { IonContent, NavController, LoadingController } from '@ionic/angular';
import { ApiService } from './../../services/api.service';
import { HelperService } from './../../services/helper.service';
import { ChatList, ChatdataEntity } from './../../services/modal/chat-list.model';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
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
        animate('.7s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class ChatPage implements OnInit {

  imgurl: string;
  chatwithid: string;
  username: string;
  chatData?: (ChatList) | null;
  myUserid: any;
  chatMessage: any = '';
  @ViewChild(IonContent) contentArea: IonContent;
  constructor(private activatedRoute: ActivatedRoute, public api: ApiService, private helper: HelperService, private navCtrl: NavController, public loadingController: LoadingController, ) {

  }

  ngOnInit() {
    this.chatwithid = this.activatedRoute.snapshot.params.chatwithid;
    this.imgurl = this.activatedRoute.snapshot.queryParams.userimg;
    this.username = this.activatedRoute.snapshot.queryParams.username;

    let user = this.helper.getLocalStorage();
    if (user != null) {
      this.myUserid = user.userdata.id
    }

    this.getChatList();
  }
  ionViewDidLoad() {

    this.contentArea.scrollToBottom();

  }
  backNavigation() {
    this.navCtrl.navigateBack('/nurse/tabs/home');
  }
  async getChatList(event = null) {
    const loading = await this.loadingController.create({
      message: '',
      spinner: null,
      cssClass: 'custom-loader-animation'
    });
    await loading.present();

    this.api.userChatList({
      params: { chatwithid: this.chatwithid }
    }).subscribe((res: any) => {
      if (res[0].success) {
        this.chatData = res[0].data;
        setTimeout(() => {
          this.contentArea.scrollToBottom();
        }, 0)

      } else {
        // this.helper.presentToastWithOptions(res[0].message)
        this.chatData = {
          chatdata: []
        }
      }
      if (event != null) {
        event.target.complete();
      }
      loading.dismiss();
    }, err => {
      if (event != null) {
        event.target.complete();
      }
      this.chatData = {
        chatdata: []
      }
      loading.dismiss();

    });
  }
  postChat() {
    if (this.chatMessage.trim() == '') {
      return;
    }
    let chatinbox = {
      userstoimage: '',
      usersbyimage: '',
      usersbyname: '',
      userstoname: '',
      chatdetails: this.chatMessage,
      created_date: '',
      created_time: '',
      enteredto: this.chatwithid,
      enteredby: this.myUserid,
      created_datetime: ''
    }
    this.chatData.chatdata.push(chatinbox);
    this.chatMessage = '';
    setTimeout(() => {
      this.contentArea.scrollToBottom();
    }, 0)
    this.api.chatMessagePost({
      enteredto: this.chatwithid,
      chatmsg: chatinbox.chatdetails

    }).subscribe((res: any) => {
      // if (res[0].success) {

      // } else {
      //   // this.helper.presentToastWithOptions(res[0].message)

      // }


    }, err => {
    });
  }




}
