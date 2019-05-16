import { Injectable, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  menuEvent: any = new EventEmitter();
  public existPopover: boolean = false;
  toastInstance:any;
  constructor(public toastController: ToastController) {
    
  }

  async presentToastWithOptions(msg, duration = 7000) {

    this.toastController.dismiss().then((obj)=>{
    }).catch(()=>{
    }).finally(()=>{
      this.manageToast(msg, duration);
    });   

  }
  manageToast(msg, duration = 7000) {
    this.toastInstance = this.toastController.create({
      message: msg,
      showCloseButton: true,
      mode: 'ios',
      position: 'bottom',
      closeButtonText: 'Ok',
      duration: duration
    }).then((obj) => {
      obj.present();
    });
  }

  setLocalStorage(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  getLocalStorage() {
    if (localStorage.getItem('user') === null) {
      return null;
    }
    return JSON.parse(localStorage.getItem('user'));
  }
  clearLocalStorage() {
    localStorage.setItem('user', null);
  }
  throwError(err) {
    if (typeof err == "object") {
      let msg = '';
      for (let m in err) {
        if (err.hasOwnProperty(m)) {
          var val = err[m];
          for (let i of val) {
            msg += i + '\n';
          }
        }

      }
      this.presentToastWithOptions(msg)
    } else {
      this.presentToastWithOptions(err)
    }
  }
  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }

  getNurseMenus() {
    return [
      {
        title: 'Home',
        url: '/nurse/tabs/home',
        icon: 'home'
      },
      {
        title: 'My Shifts',
        url: '/nurse/tabs/myshifts',
        icon: 'time'
      },
      {
        title: 'Inbox',
        url: '/nurse/tabs/inbox',
        icon: 'mail'
      },
      {
        title: 'Payment History',
        url: '/nurse/tabs/payment-history',
        icon: 'list-box'
      },
      {
        title: 'On Holiday',
        url: '/nurse/tabs/on-holiday',
        icon: 'medical'
      }, {
        title: 'Bank Account',
        url: '/nurse/tabs/add-bank-account',
        icon: 'business'
      },
      {
        title: 'Refer a friend',
        url: '/nurse/tabs/refer-a-friend',
        icon: 'person-add'
      },
      {
        title: 'My Profile',
        url: '/nurse/tabs/profile',
        icon: 'clipboard'
      },

      {
        title: 'Notifications',
        url: '/nurse/tabs/notification',
        icon: 'notifications'
      },
      {
        title: 'Help & Support',
        url: '/nurse/tabs/help',
        icon: 'call'
      }
    ];
  }
  getNHMenus() {
    return [
      {
        title: 'Book Staff',
        url: '/care-home/tabs/get-staff',
        icon: 'person-add'
      }, {
        title: 'Direct Booking',
        url: '/care-home/tabs/get-staff-direct',
        icon: 'person-add'
      }, {
        title: 'Shifts',
        url: '/care-home/tabs/shifts',
        icon: 'time'
      }, {
        title: 'Sign Off Requests',
        url: '/care-home/tabs/signoff-request',
        icon: 'paper'
      },

      {
        title: 'Staff Profiles',
        url: '/care-home/tabs/home',
        icon: 'home'
      },
      {
        title: 'Inbox',
        url: '/care-home/tabs/inbox',
        icon: 'mail'
      },
      // {
      //   title: 'Define Shifts',
      //   url: '/care-home/tabs/shift-master/define-shift',
      //   icon: 'clock'
      // }, {
      //   title: 'Define Shift Rates',
      //   url: '/care-home/tabs/shift-master/shift-master',
      //   icon: 'cash'
      // },
      {
        title: 'My Profile',
        url: '/care-home/tabs/my-profile',
        icon: 'clipboard'
      },
      {
        title: 'Notifications',
        url: '/care-home/tabs/notification',
        icon: 'notifications'
      },
      {
        title: 'Help & Support',
        url: '/care-home/tabs/help',
        icon: 'call'
      }]
  }
  geManagerMenus() {
    return [
      {
        title: 'Book Staff',
        url: '/care-home/tabs/get-staff',
        icon: 'person-add'
      }, {
        title: 'Direct Booking',
        url: '/care-home/tabs/get-staff-direct',
        icon: 'person-add'
      }, {
        title: 'Shifts',
        url: '/care-home/tabs/shifts',
        icon: 'time'
      }, {
        title: 'Sign Off Requests',
        url: '/care-home/tabs/signoff-request',
        icon: 'paper'
      },
      {
        title: 'Staff Profiles',
        url: '/care-home/tabs/home',
        icon: 'home'
      }, {
        title: 'Inbox',
        url: '/care-home/tabs/inbox',
        icon: 'mail'
      }, {
        title: 'Notifications',
        url: '/care-home/tabs/notification',
        icon: 'notifications'
      }, {
        title: 'Help & Support',
        url: '/care-home/tabs/help',
        icon: 'call'
      },
      {
        title: 'My Profile',
        url: '/care-home/tabs/my-profile',
        icon: 'clipboard'
      },





    ];
  }
}
