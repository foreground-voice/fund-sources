import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {_throw} from 'rxjs/observable/throw';
import {empty} from 'rxjs/observable/empty';
import {AppService} from './app.service';
import 'rxjs/add/operator/catch';
import {GrowlService} from '../shared/component/growl/growl.service';
import {Logger} from 'angular2-logger/core';


@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {

  constructor(private logger: Logger,
              private appService: AppService,
              private growl: GrowlService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      this.logger.log('An http error occurred: ', error);
      if (error instanceof HttpErrorResponse &&
         (error.status === 404 || error.status === 504 || error.status === 0)) {
        this.appService.showDisconnection();
        return empty();
      }
      this.growl.addError('Что-то пошло не так');
      return _throw(error);
    });
  }

}
