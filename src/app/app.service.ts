import {Injectable, Optional, SkipSelf} from '@angular/core';
import {AppComponent} from "./app.component";

@Injectable()
export class AppService {

  app: AppComponent = null;

  constructor (@Optional() @SkipSelf() self: AppService) {
    if (self) {
      throw new Error('AppService is already loaded. Import it in the AppModule only');
    }
  }

  showDisconnection() {
    this.app.isDisconnected = true;
  }

  showLoading() {
    this.app.isLoading = true;
  }
}
