import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { UpdateQuizComponent } from './update-quiz.component';

describe('UpdateQuizComponent', () => {
  let component: UpdateQuizComponent;
  let fixture: ComponentFixture<UpdateQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterModule.forRoot([]), ToastrModule.forRoot()],
      declarations: [ UpdateQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call updateQuiz() on button click', fakeAsync(() => {
    spyOn(component, 'updateQuiz')
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.updateQuiz).not.toHaveBeenCalled();
  }))

  
});