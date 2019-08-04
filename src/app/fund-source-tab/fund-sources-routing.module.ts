import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FundSourceTabComponent} from './fund-source-tab.component';

const fundSourcesRoutes: Routes = [
  {
    path: ':agreementInfoId',
    component: FundSourceTabComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(fundSourcesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FundSourcesRoutingModule {
}
