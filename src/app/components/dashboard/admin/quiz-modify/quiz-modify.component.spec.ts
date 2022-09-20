import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizModifyComponent } from './quiz-modify.component';

describe('QuizModifyComponent', () => {
  let component: QuizModifyComponent;
  let fixture: ComponentFixture<QuizModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
