import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxAlunoPage } from './rx-aluno.page';

describe('RxAlunoPage', () => {
  let component: RxAlunoPage;
  let fixture: ComponentFixture<RxAlunoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxAlunoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
