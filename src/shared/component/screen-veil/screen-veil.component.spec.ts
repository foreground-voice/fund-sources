import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScreenVeilComponent} from './screen-veil.component';

describe('ScreenVeilComponent', () => {
  let component: ScreenVeilComponent;
  let fixture: ComponentFixture<ScreenVeilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenVeilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenVeilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
