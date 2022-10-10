import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from  '@angular/platform-browser'
import { ToastrModule } from 'ngx-toastr';
import { QuestionGroupDisplayComponent } from './display-questiongroup.component';

describe('QuestionGroupDisplayComponent', () => {
  let component: QuestionGroupDisplayComponent;
  let fixture: ComponentFixture<QuestionGroupDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule, ToastrModule.forRoot()],
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

  it('should call createQuiz() when clicked', fakeAsync(() => {
    spyOn(component, 'createQuestionGroup');
    let createButton = fixture.nativeElement.querySelector('#createQuestionGroup');
    createButton.click();
    tick();
    expect(component.createQuestionGroup).toHaveBeenCalled();
  }))
});