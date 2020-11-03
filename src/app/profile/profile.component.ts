import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/services/token-storage/token-storage.service';
import {TokenInterface} from '../shared/services/token-storage/token.interface';
import {UserInfoInterface} from '../shared/services/user/user-info.interface';
import {select, Store} from '@ngrx/store';
import {actions as AuthActions, selector as AuthSelector, state as AuthState} from '@app-shared/state/auth';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private isAuthenticatedDestroy$ = new Subject();
  private userInfoDestroy$ = new Subject();
  private tokenDestroy$ = new Subject();

  public currentUser: UserInfoInterface | undefined;
  public token: TokenInterface | undefined;

  private isAuthenticated = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private authStore: Store<AuthState.AuthStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.authStore.pipe(
      select(AuthSelector.isAuthenticated),
      filter(data => data !== undefined),
      takeUntil(this.isAuthenticatedDestroy$)
    ).subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;

      if (this.isAuthenticated) {
        this.authStore.dispatch(new AuthActions.UserInfo());
      }
    });

    this.authStore.pipe(
      select(AuthSelector.getToken),
      filter(data => data !== undefined),
      takeUntil(this.tokenDestroy$)
    ).subscribe((token: TokenInterface | undefined) => {
      this.token = token;
    });

    this.authStore.pipe(
      select(AuthSelector.getUserInfo),
      filter(data => data !== undefined),
      takeUntil(this.userInfoDestroy$)
    ).subscribe((userInfo: UserInfoInterface | undefined) => this.currentUser = userInfo);
  }

  public ngOnDestroy(): void {
    this.isAuthenticatedDestroy$.next();
    this.isAuthenticatedDestroy$.complete();

    this.userInfoDestroy$.next();
    this.userInfoDestroy$.complete();

    this.tokenDestroy$.next();
    this.tokenDestroy$.complete();
  }
}
