import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentHistoryPage } from './payment-history.page';

import { SkeltonHeaderPageModule } from '../../directives/skelton/skelton-header/skelton-header.module';
import { SkeltonListSinglePageModule } from '../../directives/skelton/skelton-list-single/skelton-list-single.module';


const routes: Routes = [
  {
    path: '',
    component: PaymentHistoryPage,
    children: [
      {
        path: 'bank-account-pending',
        loadChildren: './bank-account-pending/bank-account-pending.module#BankAccountPendingPageModule'
      },
      {
        path: 'bank-account-settled',
        loadChildren: './bank-account-settled/bank-account-settled.module#BankAccountSettledPageModule'
      },
      {
        path: '',
        redirectTo: 'bank-account-settled',
        pathMatch: 'full'
      }
    ]
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
  declarations: [PaymentHistoryPage]
})
export class PaymentHistoryPageModule {}
