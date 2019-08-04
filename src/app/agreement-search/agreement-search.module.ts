import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgreementSearchComponent} from './agreement-search.component';
import {AgreementSearchRoutingModule} from './agreement-search-routing.module';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../../shared/component/components.module';
import {
  ConfirmDialogModule,
  ContextMenuModule,
  DataTableModule,
  InputTextModule,
  PanelModule,
  TabMenuModule
} from 'primeng/primeng';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpAppInterceptor} from '../http-app-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    TabMenuModule,
    InputTextModule,
    DataTableModule,
    ContextMenuModule,
    HttpClientModule,
    PanelModule,
    ConfirmDialogModule,
    AgreementSearchRoutingModule
  ],
  exports: [
    AgreementSearchComponent
  ],
  declarations: [
    AgreementSearchComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAppInterceptor, multi: true }
  ]
})
export class AgreementSearchModule {
}
