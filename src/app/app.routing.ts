import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {LoginGuard} from '@app-shared/guard/login.guard';
import {RoutePathEnum} from '@app-shared/route-path.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutePathEnum.home
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: RoutePathEnum.login,
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
    path: RoutePathEnum.profile,
    component: ProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: RoutePathEnum.realtime,
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import('./realtime/realtime.module')
      .then(m => m.RealtimeModule)
  },
  {
    path: RoutePathEnum.stats,
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import('./stats/stats.module')
      .then(m => m.StatsModule)
  },
  {
    path: RoutePathEnum.report,
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import('./report/report.module')
      .then(m => m.ReportModule)
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRouting {
}
