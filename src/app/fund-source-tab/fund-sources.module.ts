import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComponentsModule} from '../../shared/component/components.module';
import {
  BreadcrumbModule,
  ConfirmDialogModule,
  ContextMenuModule,
  DropdownModule,
  InputTextModule,
  PanelModule,
} from 'primeng/primeng';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpAppInterceptor} from '../http-app-interceptor';
import {FundSourceTabComponent} from './fund-source-tab.component';
import {FundSourcesRoutingModule} from './fund-sources-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BreadcrumbModule,
    InputTextModule,
    DropdownModule,
    ContextMenuModule,
    HttpClientModule,
    PanelModule,
    ConfirmDialogModule,
    FundSourcesRoutingModule
  ],
  exports: [
    FundSourceTabComponent
  ],
  declarations: [
    FundSourceTabComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAppInterceptor, multi: true }
  ],
})
export class FundSourcesModule {
}
