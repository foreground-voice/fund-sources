import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextInputComponent} from './text-input/text-input.component';
import {
  AutoCompleteModule,
  CalendarModule,
  DialogModule,
  GrowlModule,
  InputTextModule, KeyFilterModule,
  PanelModule,
  SharedModule,
  TabViewModule
} from 'primeng/primeng';
import {DateRangeInputComponent} from './date-range-input/date-range-input.component';
import {FormsModule} from '@angular/forms';
import {NumberRangeInputComponent} from './number-range-input/number-range-input.component';
import {MultiselectListComponent} from './multiselect-list/multiselect-list.component';
import {RouterModule} from '@angular/router';
import {NumberInputComponent, NumberInputValidator} from './number-input/number-input.component';
import {GrowlComponent} from './growl/growl.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {ScreenVeilComponent} from './screen-veil/screen-veil.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AutoCompleteModule,
    CalendarModule,
    PanelModule,
    InputTextModule,
    KeyFilterModule,
    RouterModule,
    TabViewModule,
    DialogModule,
    GrowlModule
  ],
  declarations: [
    TextInputComponent,
    DateRangeInputComponent,
    NumberRangeInputComponent,
    MultiselectListComponent,
    NumberInputValidator,
    NumberInputComponent,
    GrowlComponent,
    SpinnerComponent,
    ScreenVeilComponent
  ],
  exports: [
    TextInputComponent,
    DateRangeInputComponent,
    NumberInputValidator,
    NumberInputComponent,
    NumberRangeInputComponent,
    MultiselectListComponent,
    GrowlComponent,
    SpinnerComponent,
    ScreenVeilComponent
  ]
})
export class ComponentsModule { }
