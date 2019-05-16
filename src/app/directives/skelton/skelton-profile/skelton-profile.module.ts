import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkeltonProfilePage } from './skelton-profile.page';

const routes: Routes = [
  {
    path: 'skelton-profile',
    component: SkeltonProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [SkeltonProfilePage],
  declarations: [SkeltonProfilePage]
})
export class SkeltonProfilePageModule {}
