import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { UpdateQuestionGroupsComponent } from './update-question-groups.component';

describe('UpdateQuestionGroupsComponent', () => {
  let component: UpdateQuestionGroupsComponent;
  let fixture: ComponentFixture<UpdateQuestionGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterModule.forRoot([]), ToastrModule.forRoot()],
      declarations: [ UpdateQuestionGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuestionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call updateQuestionGroup() on button click', fakeAsync(() => {
    spyOn(component, 'updateQuestionGroup')
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.updateQuestionGroup).not.toHaveBeenCalled();
  }))

  it('should call the getQuestionByTopic() when dropdown value is changed', fakeAsync(() => {
    spyOn(component, 'getQuestionByTopic');
    let dropdown = fixture.nativeElement.querySelector('select');
    dropdown.dispatchEvent(new Event('change'));
    expect(component.getQuestionByTopic).toHaveBeenCalled();
  }))

  it('should call onSelectAll() when clicked', fakeAsync(() => {
    spyOn(component, 'onSelectAll');
    let selectAll = fixture.nativeElement.querySelector('#selectAll');
    selectAll.dispatchEvent(new Event('change'));
    expect(component.onSelectAll).toHaveBeenCalled();
  }))
});