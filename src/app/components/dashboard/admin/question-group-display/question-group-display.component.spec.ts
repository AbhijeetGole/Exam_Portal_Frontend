import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupDisplayComponent } from './question-group-display.component';

describe('QuestionGroupDisplayComponent', () => {
  let component: QuestionGroupDisplayComponent;
  let fixture: ComponentFixture<QuestionGroupDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGroupDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
