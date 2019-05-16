import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeDetailPage } from './home-detail.page';
import { SkeltonViewProfilePageModule } from '../../directives/skelton/skelton-view-profile/skelton-view-profile.module';

const routes: Routes = [
  {
    path: '',
    component: HomeDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SkeltonViewProfilePageModule
  ],
  declarations: [HomeDetailPage]
})
export class HomeDetailPageModule {}
