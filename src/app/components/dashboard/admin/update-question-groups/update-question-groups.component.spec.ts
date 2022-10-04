import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionGroupsComponent } from './update-question-groups.component';

describe('UpdateQuestionGroupsComponent', () => {
  let component: UpdateQuestionGroupsComponent;
  let fixture: ComponentFixture<UpdateQuestionGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
});
