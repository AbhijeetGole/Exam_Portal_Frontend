import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateQuestionComponent } from './create-question.component';
import { QuestionDisplayComponent } from '../display-questions/display-questions.component';

describe('CreateQuestionComponent', () => {
  let component: CreateQuestionComponent;
  let fixture: ComponentFixture<CreateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [ CreateQuestionComponent, QuestionDisplayComponent ],
      providers: [QuestionDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call createQuestion() on button click', fakeAsync(() => {
    spyOn(component, 'createQuestion')
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.createQuestion).not.toHaveBeenCalled();
  }))
});
