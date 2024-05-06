import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './state/effects/login.effects';
import { UserEffects } from './state/effects/user.effects';
import { VaultEffects } from './state/effects/vault.effects';
import { RecordEffects } from './state/effects/record.effects';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStore(reducers, { metaReducers }),
    provideEffects([LoginEffects, UserEffects, VaultEffects, RecordEffects]),
    importProvidersFrom(HttpClientModule)
  ]
};
