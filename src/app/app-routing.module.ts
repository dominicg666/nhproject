import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/AuthGuard/auth-guard.service';
import { NurseGuardService } from './services/AuthGuard/nurse-guard.service';
import { NurseHomeGuardService } from './services/AuthGuard/nurse-home-guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'nurse', loadChildren: './nurse/tabs/tabs.module#TabsPageModule', canActivate: [NurseGuardService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [AuthGuardService]},
  { path: 'skelton-profile', loadChildren: './directives/skelton/skelton-profile/skelton-profile.module#SkeltonProfilePageModule' },
  { path: 'skelton-view-profile', loadChildren: './directives/skelton/skelton-view-profile/skelton-view-profile.module#SkeltonViewProfilePageModule' }








];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
