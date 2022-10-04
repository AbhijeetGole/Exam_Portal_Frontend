import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebuttonComponent } from './createButton.component';

describe('CreatebuttonComponent', () => {
  let component: CreatebuttonComponent;
  let fixture: ComponentFixture<CreatebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
