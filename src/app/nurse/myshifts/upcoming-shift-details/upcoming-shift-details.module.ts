import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpcomingShiftDetailsPage } from './upcoming-shift-details.page';
import { SkeltonViewProfilePageModule } from '../../../directives/skelton/skelton-view-profile/skelton-view-profile.module';

const routes: Routes = [
  {
    path: '',
    component: UpcomingShiftDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonViewProfilePageModule
  ],
  declarations: [UpcomingShiftDetailsPage]
})
export class UpcomingShiftDetailsPageModule {}
