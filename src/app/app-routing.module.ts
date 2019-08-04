import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'search',
    loadChildren: 'app/agreement-search/agreement-search.module#AgreementSearchModule'
  },
  {
    path: 'fund-sources',
    loadChildren: 'app/fund-source-tab/fund-sources.module#FundSourcesModule'
  },
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: '**', redirectTo: 'search'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
