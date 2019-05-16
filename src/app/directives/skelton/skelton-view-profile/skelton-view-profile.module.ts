import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkeltonViewProfilePage } from './skelton-view-profile.page';

const routes: Routes = [
  {
    path: 'skelton-view-profile',
    component: SkeltonViewProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [SkeltonViewProfilePage],
  declarations: [SkeltonViewProfilePage]
})
export class SkeltonViewProfilePageModule {}
