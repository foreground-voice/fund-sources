import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from '../shared/component/components.module';
import {BreadcrumbModule, ConfirmationService, ConfirmDialogModule, InputTextModule} from 'primeng/primeng';
import {Level as LoggerLevel, Logger, Options as LoggerOptions} from 'angular2-logger/core';
import {environment} from './environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GrowlService} from '../shared/component/growl/growl.service';
import {Environment} from '../shared/environment';
import {HttpAppInterceptor} from './http-app-interceptor';
import {AppService} from './app.service';

@NgModule({
  imports: [
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {provide: Environment, useValue: environment},
    {provide: LoggerOptions, useValue: {level: environment.production ? LoggerLevel.LOG : LoggerLevel.LOG}},
    Logger,
    {provide: AppService, useValue: new AppService(null)},
    {provide: HTTP_INTERCEPTORS, useClass: HttpAppInterceptor, multi: true},
    ConfirmationService,
    GrowlService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
