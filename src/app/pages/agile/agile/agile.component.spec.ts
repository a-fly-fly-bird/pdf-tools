/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgileComponent } from './agile.component';

describe('AgileComponent', () => {
  let component: AgileComponent;
  let fixture: ComponentFixture<AgileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
