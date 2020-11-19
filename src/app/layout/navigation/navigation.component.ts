import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@app-shared/services/auth/auth.service';
import {select, Store} from '@ngrx/store';
import {selector as AuthSelector, state as AuthState} from '@app-shared/state/auth';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {RoutePathEnum} from '@app-shared/route-path.enum';

interface RouteBehindLoginInterface {
  label: string;
  route: RoutePathEnum;
  icon?: string;
}


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private isAuthenticatedDestroy$ = new Subject();
  public isLoggedIn = false;

  public routeBehindLoginOnTheLeft: RouteBehindLoginInterface[] = [
    {
      label: 'Home',
      route: RoutePathEnum.home,
      icon: 'fas fa-home'
    },
    {
      label: 'Realtime',
      route: RoutePathEnum.realtime,
      icon: 'fas fa-chart-line'
    },
    {
      label: 'Report',
      route: RoutePathEnum.report,
      icon: 'fas fa-chart-bar'
    },
    {
      label: 'Stats',
      route: RoutePathEnum.stats,
      icon: 'fas fa-info'
    }
  ];
  public routeBehindLoginOnTheRight: RouteBehindLoginInterface[] = [
    {
      label: 'Profile',
      route: RoutePathEnum.profile,
      icon: 'fas fa-user-alt'
    }
  ];
  public routeLogin: RouteBehindLoginInterface = {
    label: 'Login',
    route: RoutePathEnum.login,
    icon: 'far fa-user'
  };

  constructor(
    private authService: AuthService,
    private authStore: Store<AuthState.AuthStateInterface>
  ) {
  }

  public ngOnInit(): void {
    this.authStore.pipe(
      select(AuthSelector.isAuthenticated),
      filter(data => data !== undefined),
      takeUntil(this.isAuthenticatedDestroy$)
    ).subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  public logout(): void {
    this.authService.logOut();
    window.location.reload();
  }

  public ngOnDestroy(): void {
    this.isAuthenticatedDestroy$.next();
    this.isAuthenticatedDestroy$.complete();
  }
}
