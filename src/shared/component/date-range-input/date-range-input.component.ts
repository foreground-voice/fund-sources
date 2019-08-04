import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import {LocaleDateTime} from '../locale-date-time';

@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeInputComponent implements OnInit {

  LocaleDateTime = LocaleDateTime;

  private _beginDate: Date = null;

  @Input()
  set beginDate(value: Date) {
    this._beginDate = value;
    this.errorMessage = this.getErrorMessage();
  }

  @Output()
  beginDateChange = new EventEmitter<Date>();


  private _endDate: Date = null;

  @Input()
  set endDate(value: Date) {
    this._endDate = value;
    this.errorMessage = this.getErrorMessage();
  }

  @Output()
  endDateChange = new EventEmitter<Date>();


  errorMessage: string = '';

  constructor() { }

  ngOnInit() {
  }

  onChange(event?: Event) {
    this.beginDateChange.emit(this._beginDate);
    this.endDateChange.emit(this._endDate);
    this.errorMessage = this.getErrorMessage();
  }

  isValid(): boolean {
    return this.errorMessage === '';
  }

  private getErrorMessage(): string {
    if (this._beginDate && this._endDate && this._beginDate > this._endDate) {
      return 'Дата начала периода не может быть больше даты окончания периода';
    }
    return '';
  }
}
