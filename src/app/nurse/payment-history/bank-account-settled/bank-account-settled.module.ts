import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BankAccountSettledPage } from './bank-account-settled.page';
import { SkeltonHeaderPageModule } from '../../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListSinglePageModule } from '../../../directives/skelton/skelton-list-single/skelton-list-single.module';
const routes: Routes = [
  {
    path: '',
    component: BankAccountSettledPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonHeaderPageModule,
    SkeltonListSinglePageModule
  ],
  declarations: [BankAccountSettledPage]
})
export class BankAccountSettledPageModule {}
