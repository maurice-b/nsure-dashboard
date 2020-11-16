import {ModuleWithProviders, NgModule} from '@angular/core';
import {environment} from '../environments/environment';
import {CommonModule} from '@angular/common';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {appReducer} from '@app-shared/state/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {appEffects} from '@app-shared/state/app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppStateInterface} from '@app-shared/state/app.state';
import {storeFreeze} from 'ngrx-store-freeze';

export const metaReducers: MetaReducer<AppStateInterface>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  imports: [
    CommonModule,
    // NGRX Store
    StoreModule.forRoot(
      appReducer,
      {
        metaReducers
      }
    ),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({
      name: 'NSURE Dashboard DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),

  ],
  exports: [
    StoreModule,
    EffectsModule,
    StoreDevtoolsModule
  ]
})

export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule,
      providers: []
    };
  }
}
