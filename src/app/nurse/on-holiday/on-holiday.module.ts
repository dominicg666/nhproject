import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OnHolidayPage } from './on-holiday.page';
import { SkeltonHeaderPageModule } from '../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListSinglePageModule } from '../../directives/skelton/skelton-list-single/skelton-list-single.module';

const routes: Routes = [
  {
    path: '',
    component: OnHolidayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SkeltonListSinglePageModule,
    SkeltonHeaderPageModule
  ],
  declarations: [OnHolidayPage]
})
export class OnHolidayPageModule {}
