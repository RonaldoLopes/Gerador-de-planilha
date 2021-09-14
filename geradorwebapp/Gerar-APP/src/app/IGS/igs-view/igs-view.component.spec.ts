/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IgsViewComponent } from './igs-view.component';

describe('IgsViewComponent', () => {
  let component: IgsViewComponent;
  let fixture: ComponentFixture<IgsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
