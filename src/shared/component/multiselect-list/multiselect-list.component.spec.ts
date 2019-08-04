import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiselectListComponent} from './multiselect-list.component';

describe('MultiselectListComponent', () => {
  let component: MultiselectListComponent<any>;
  let fixture: ComponentFixture<MultiselectListComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiselectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
