import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx'
import { File } from '@ionic-native/file/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { CustomControlService } from '../../directives/form-wizard-mt/custom-fields.service';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [CustomControlService,Camera,FileTransfer,Chooser,File,FileOpener,Crop],
  declarations: [ProfilePage]
})
export class ProfilePageModule { }
