import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreateQueGrpComponent } from './create-questiongroup.component';

describe('CreategrpformComponent', () => {
  let component: CreateQueGrpComponent;
  let fixture: ComponentFixture<CreateQueGrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [ CreateQueGrpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQueGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call createQuestionGroup() on button click', fakeAsync(() => {
    spyOn(component, 'createQuestionGroup')
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.createQuestionGroup).not.toHaveBeenCalled();
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
