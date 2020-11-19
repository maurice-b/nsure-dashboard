import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRouting} from './app.routing';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LocationComponent} from './stats/location/location.component';
import {HomeComponent} from './home/home.component';
import {AuthInterceptor} from './shared/interceptor/auth.interceptor';
import {LayoutModule} from './layout/layout.module';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './shared/guard/auth.guard';
import {AuthService} from './shared/services/auth/auth.service';
import {GlobalErrorHandlerService} from './global-error-handler.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StateModule} from './state.module';
import {LoginGuard} from '@app-shared/guard/login.guard';
import {StatsModule} from './stats/stats.module';
import {SharedModule} from '@app-shared/shared.module';
import {ReportModule} from '@app-report/report.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRouting,
    LayoutModule,
    FormsModule,
    StateModule.forRoot(),
    StatsModule,
    ReportModule,
    SharedModule
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
