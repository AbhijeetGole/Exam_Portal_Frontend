import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { DisplayQuizComponent } from './display-quiz.component';
import { NgxPaginationModule } from 'ngx-pagination'

describe('DisplayQuizComponent', () => {
  let component: DisplayQuizComponent;
  let fixture: ComponentFixture<DisplayQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule, ToastrModule.forRoot()],
      declarations: [ DisplayQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createQuiz() when clicked', fakeAsync(() => {
    spyOn(component, 'createQuiz');
    let createButton = fixture.nativeElement.querySelector('#createQuiz');
    createButton.click();
    tick();
    expect(component.createQuiz).toHaveBeenCalled();
  }))
});