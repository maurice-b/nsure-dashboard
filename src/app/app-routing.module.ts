import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LocationComponent} from './location/location.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {LoginGuard} from '@app-shared/guard/login.guard';
import {StatsContainerComponent} from './stats/stats-container/stats-container.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      LoginGuard
    ]
  },
  // {
  //   // TODO: Create logout component.
  //   path: 'logout',
  //   component: LogOutComponent,
  // },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'locations',
    component: LocationComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'stats',
    component: StatsContainerComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
