import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionModifyComponent } from './question-modify.component';

describe('QuestionModifyComponent', () => {
  let component: QuestionModifyComponent;
  let fixture: ComponentFixture<QuestionModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
