import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [provideZoneChangeDetection(), ...appConfig.providers],
})
    // Zone.js applications cannot use top-level await: the bundler fails the
    // build with "Top-level await is not supported in applications that use
    // Zone.js". This stays the standard Angular bootstrap promise chain until
    // the app goes zoneless.
    // eslint-disable-next-line unicorn/prefer-top-level-await, unicorn/prefer-await
    .catch((error) => console.error(error));
