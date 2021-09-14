/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VariavelComponent } from './variavel.component';

describe('VariavelComponent', () => {
  let component: VariavelComponent;
  let fixture: ComponentFixture<VariavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
