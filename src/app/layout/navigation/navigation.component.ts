import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '@app-shared/services/auth/auth.service';
import {select, Store} from '@ngrx/store';
import {selector as AuthSelector, state as AuthState} from '@app-shared/state/auth';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private isAuthenticatedDestroy$ = new Subject();
  public isLoggedIn = false;

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
