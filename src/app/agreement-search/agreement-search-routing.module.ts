import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AgreementSearchComponent} from './agreement-search.component';

const agreementSearchRoutes: Routes = [
  {
    path: '',
    component: AgreementSearchComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(agreementSearchRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AgreementSearchRoutingModule {
}
