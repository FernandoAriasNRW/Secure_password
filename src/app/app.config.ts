import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { reducers, metaReducers } from './state';
import { UploadEffects } from './state/effects/upload.effects';
import { LoginEffects } from './state/effects/login.effects';
import { UserEffects } from './state/effects/user.effects';
import { VaultEffects } from './state/effects/vault.effects';
import { RecordEffects } from './state/effects/record.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStore(reducers, { metaReducers }),
    provideEffects([LoginEffects, UserEffects, VaultEffects, RecordEffects, UploadEffects]),
     provideStoreDevtools({
        maxAge: 25, // Retains last 25 states
       logOnly: !isDevMode(), // Restrict extension to log-only mode
       autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
       traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
       connectInZone: true // If set to true, the connection is established within the Angular zone
     }),
    importProvidersFrom(HttpClientModule),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      toastClass: 'p-4 rounded text-light font-weight-bold toastr-icon',
      iconClasses: {
        success: 'toast-success',
        error: 'toast-error',
        info: 'toast-info',
        warning: 'toast-warning',
      },
      preventDuplicates: true,
    }),
    provideAnimations(),
  ]
};


