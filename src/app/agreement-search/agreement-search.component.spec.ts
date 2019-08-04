import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AgreementSearchComponent} from './agreement-search.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AgreementSearchComponent', () => {
  let component: AgreementSearchComponent;
  let fixture: ComponentFixture<AgreementSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ AgreementSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
