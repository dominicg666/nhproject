import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SkeltonHeaderPage } from './skelton-header.page';

const routes: Routes = [
  {
    path: 'skelton-header',
    component: SkeltonHeaderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:[SkeltonHeaderPage],
  declarations: [SkeltonHeaderPage]
})
export class SkeltonHeaderPageModule {}
