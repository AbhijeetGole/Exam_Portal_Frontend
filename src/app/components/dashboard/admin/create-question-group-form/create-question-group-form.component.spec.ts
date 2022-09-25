import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionGroupFromComponent } from './create-question-group-form.component';

describe('CreateQuestionGroupFromComponent', () => {
  let component: CreateQuestionGroupFromComponent;
  let fixture: ComponentFixture<CreateQuestionGroupFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuestionGroupFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuestionGroupFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
