import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoAlunoPage } from './novo-aluno.page';

describe('NovoAlunoPage', () => {
  let component: NovoAlunoPage;
  let fixture: ComponentFixture<NovoAlunoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoAlunoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
