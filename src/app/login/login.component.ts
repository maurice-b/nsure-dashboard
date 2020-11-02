import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth/auth.service';
import {TokenStorageService} from '../shared/services/token-storage/token-storage.service';
import {TokenInterface} from '../shared/services/token-storage/token.interface';
import {Router} from '@angular/router';
import {CredentialsInterface} from '../shared/services/auth/credentials.interface';
import {select, Store} from '@ngrx/store';
import {selector as AuthSelector, state as AuthState, actions as AuthActions} from '@app-shared/state/auth';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private isAuthenticatedDestroy$ = new Subject();

  public form: CredentialsInterface = {
    password: '',
    username: ''
  };
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private authStore: Store<AuthState.AuthStateInterface>
  ) {
  }

  public ngOnInit(): void {
    this.authStore.pipe(
      select(AuthSelector.isAuthenticated),
      filter(data => data !== undefined),
      takeUntil(this.isAuthenticatedDestroy$)
    ).subscribe((isAuthenticated: boolean) => this.isLoggedIn = isAuthenticated);
  }

  public onSubmit(): void {
    const credentials: CredentialsInterface = {
      username: this.form.username,
      password: this.form.password
    };

    this.authStore.dispatch(new AuthActions.Authenticate(credentials));
  }

  public ngOnDestroy(): void {
    this.isAuthenticatedDestroy$.next();
    this.isAuthenticatedDestroy$.complete();
  }
}
