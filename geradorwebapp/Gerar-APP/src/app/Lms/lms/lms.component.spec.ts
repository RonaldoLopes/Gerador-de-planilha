/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LmsComponent } from './lms.component';

describe('LmsComponent', () => {
  let component: LmsComponent;
  let fixture: ComponentFixture<LmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
