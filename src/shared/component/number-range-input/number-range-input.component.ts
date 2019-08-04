import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';

class InputModel {
  value: string = '';
  numberValue: number = null;
  errorMessage: string = '';
}

@Component({
  selector: 'app-number-range-input',
  templateUrl: './number-range-input.component.html',
  styleUrls: ['./number-range-input.component.scss'],
})
export class NumberRangeInputComponent implements OnInit {

  @Output()
  minNumberChange: EventEmitter<number> = new EventEmitter();

  @Output()
  maxNumberChange: EventEmitter<number> = new EventEmitter();

  @HostBinding('class.bigInput')
  private initClass = true;

  private maxInput: InputModel = new InputModel();
  private minInput: InputModel = new InputModel();
  private inputs = [this.minInput, this.maxInput];

  errorMessage = '';

  @Input()
  set minNumber(value: number) {
    this.minInput.numberValue = value;
    this.minInput.value = value ? '' + value : '';
    this.onChange(null, false);
  }

  @Input()
  set maxNumber(value: number) {
    this.maxInput.numberValue = value;
    this.maxInput.value = value ? '' + value : '';
    this.onChange(null, false);
  }

  constructor() {}

  public ngOnInit() {
  }

  onChange(event?: Event, emit: boolean = true) {
    for (const input of this.inputs) {
      if (input.value == null || input.value.trim() === '') {
        input.errorMessage = '';
        input.numberValue = null;
        continue;
      }
      if (!isNumeric(input.value)) {
        input.errorMessage = 'Пожалуйста, введите число';
        return;
      }
      const numberValue = Number(input.value);
      if (numberValue < 0) {
        input.errorMessage = 'Пожалуйста, введите число, большее или равное 0';
        return;
      }
      input.errorMessage = '';
      input.numberValue = numberValue;
    }

    // dispatch changes
    if (emit) {
      this.minNumberChange.emit(this.minInput.numberValue);
      this.maxNumberChange.emit(this.maxInput.numberValue);
    }
    // console.log('minNumber: ' + this.minInput.numberValue + ', maxNumber: ' + this.maxInput.numberValue);

    if (this.minInput.numberValue != null
     && this.maxInput.numberValue != null
     && this.minInput.numberValue > this.maxInput.numberValue) {
      this.errorMessage = 'Минимальное значение не может быть больше максимального.';
    } else {
      this.errorMessage = '';
    }
  }

  getErrorMessage(): string {
    for (const input of this.inputs) {
      if (input.errorMessage) {
        return input.errorMessage;
      }
    }
    return this.errorMessage;
  }

  public isValid(): boolean {
    return this.getErrorMessage() === '';
  }
}
