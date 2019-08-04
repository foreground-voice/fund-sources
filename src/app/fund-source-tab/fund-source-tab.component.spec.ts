import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FundSourceTabComponent} from './fund-source-tab.component';

describe('FundSourceTabComponent', () => {
  let component: FundSourceTabComponent;
  let fixture: ComponentFixture<FundSourceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
