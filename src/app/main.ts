import {enableProdMode, LOCALE_ID} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';
import {environment} from './environments/environment';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';

// the second parameter 'ru' is optional
registerLocaleData(localeRu);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: LOCALE_ID, useValue: 'ru' }
  ]
})
.catch(err => console.error('global handler: ' + err));
