import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizdisplayComponent } from './quiz-display.component';

describe('QuizdisplayComponent', () => {
  let component: QuizdisplayComponent;
  let fixture: ComponentFixture<QuizdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
