import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.page.html',
  styleUrls: ['./payment-history.page.scss'],
})
export class PaymentHistoryPage implements OnInit {

  constructor( private router: Router, private nativePageTransitions: NativePageTransitions,
    public api: ApiService, ) { }

  ngOnInit() {
  }
  myswiperight() {
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
    // this.nativePageTransitions.slide(options);
    this.router.navigate(['/nurse/tabs/payment-history/bank-account-settled']);
  }

}
