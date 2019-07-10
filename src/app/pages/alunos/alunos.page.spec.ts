import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosPage } from './alunos.page';

describe('AlunosPage', () => {
  let component: AlunosPage;
  let fixture: ComponentFixture<AlunosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
