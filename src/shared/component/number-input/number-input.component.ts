import {
  Component, Directive, ElementRef, EventEmitter, forwardRef, Host, InjectionToken, Injector, Input, OnInit, Optional,
  Output, Query,
  Renderer2,
  resolveForwardRef, Self,
  ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from '@angular/forms';


@Directive({
  selector: 'app-number-input',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberInputValidator), multi: true}
  ]
})
export class NumberInputValidator implements Validator {

  number: number = Math.round(Math.random() * 10000);

  constructor(private _vcr: ViewContainerRef) {

  }

  validate(c: AbstractControl): ValidationErrors | null {
    const numberInput = this._vcr.injector.get(NumberInputComponent);
    console.log('validate(): ', this.number, numberInput.isValid());
    const result = {
      [numberInput.name]: numberInput.isValid()
    };
    return numberInput.isValid() ? null : result;
  }
}

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    },
    // {
    //   provide: NG_VALIDATORS,
    //   // useValue: new NumberInputValidator(),
    //   useExisting: forwardRef(() => NumberInputValidator),
    //   multi: true
    // }
  ]
})
export class NumberInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  name: string = null;

  @Input()
  set value(value: number) {
    this.numberValue = value;
  }
  private numberValue: number = null;

  @Output()
  valueChange: EventEmitter<number> = new EventEmitter();

  @Input()
  disabled = false;

  @Input()
  maxlength = null;

  private _onChange: any = () => {};
  private _onTouched: any = () => {};
  private _errorMessage = '';
  private get errorMessage(): string {
    return this._errorMessage;
  }
  private set errorMessage(value: string) {
    this._errorMessage = value;
    console.log('set errorMessage -> onChange()' + value);
    this._onChange(this.isValid() ? this.numberValue : null);
  }

  @ViewChild(ElementRef)
  private inputElement: ElementRef = null;

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit() {
  }

  onChange(value: string) {
    if (value == null || value.trim() === '') {
      this.numberValue = null;
      this.valueChange.emit(null);
      this.errorMessage = '';
      return;
    }
    if (!isNumeric(value)) {
      this.errorMessage = 'Пожалуйста, введите число';
      return;
    }
    const numberValue = Number(value);
    if (numberValue < 0) {
      this.errorMessage = 'Пожалуйста, введите число, большее или равное 0';
      return;
    }
    this.numberValue = numberValue;
    this.valueChange.emit(numberValue);
    this.errorMessage = '';
  }

  isValid(): boolean {
    return this.errorMessage === '';
  }

  /*-- value accessor interface below --*/

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(() => console.log('OnChange()'));
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
