import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-myshifts',
  templateUrl: './myshifts.page.html',
  styleUrls: ['./myshifts.page.scss'],
})
export class MyshiftsPage implements OnInit {

  constructor(public api: ApiService,
    private router: Router, private nativePageTransitions: NativePageTransitions) { }

  ngOnInit() {
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
    this.nativePageTransitions.slide(options);
    this.router.navigate(['/nurse/tabs/myshifts/completed']);
  }
  
}
