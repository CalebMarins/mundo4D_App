import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosPage } from './recursos.page';

describe('RecursosPage', () => {
  let component: RecursosPage;
  let fixture: ComponentFixture<RecursosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
