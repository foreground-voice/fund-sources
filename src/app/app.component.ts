import {Component, OnDestroy, OnInit} from '@angular/core';
import {Logger} from 'angular2-logger/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AppService} from "./app.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  navigationSubscription: Subscription = null;
  isLoading: boolean = false;
  isDisconnected: boolean = false;

  constructor(private logger: Logger,
              private router: Router,
              private appService: AppService) {
    appService.app = this;
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


}
