import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LocationComponent} from './location/location.component';
import {StatsComponent} from './stats/stats.component';
import {HomeComponent} from './home/home.component';
import {AuthInterceptor} from './shared/helpers/auth.interceptor';
import {LayoutModule} from './layout/layout.module';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './shared/guard/auth.guard';
import {AuthService} from './shared/services/auth/auth.service';
import {GlobalErrorHandlerService} from './global-error-handler.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StateModule} from './state.module';
import {LoginGuard} from '@app-shared/guard/login.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LocationComponent,
    StatsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    StateModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // register global error handler
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
