import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberRangeInputComponent} from './number-range-input.component';
import {isNumeric} from 'rxjs/util/isNumeric';
import {FormsModule} from '@angular/forms';

describe('NumberRangeInputComponent', () => {
  let component: NumberRangeInputComponent;
  let fixture: ComponentFixture<NumberRangeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ NumberRangeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test isNumeric', () => {
    console.log('isNumeric(\'-1\') == ' + isNumeric('-1'));
    console.log('isNumeric(\'-\') == ' + isNumeric('-'));
    console.log('isNumeric(\'\') == ' + isNumeric(''));
    console.log('isNumeric(\' \') == ' + isNumeric(' '));
    console.log('isNumeric(\'.\') == ' + isNumeric('.'));
    console.log('isNumeric(\'f\') == ' + isNumeric('f'));
    console.log('isNumeric(\'e\') == ' + isNumeric('e'));
  });

  it('test just string to boolean', () => {
    let value = null;
    console.log('string to boolean null == ' + (value === true));
    value = '';
    console.log('string to boolean \'\' == ' + (value === true));
    value = ' ';
    console.log('string to boolean \' \' == ' + (value === true));
    value = '  ';
    console.log('string to boolean \'  \' == ' + (value === true));
  });
});
