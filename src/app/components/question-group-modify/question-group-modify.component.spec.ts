import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupModifyComponent } from './question-group-modify.component';

describe('QuestionGroupModifyComponent', () => {
  let component: QuestionGroupModifyComponent;
  let fixture: ComponentFixture<QuestionGroupModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionGroupModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
