/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UmComponent } from './um.component';

describe('UmComponent', () => {
  let component: UmComponent;
  let fixture: ComponentFixture<UmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
