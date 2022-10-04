import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategrpformComponent } from './creategrpform.component';

describe('CreategrpformComponent', () => {
  let component: CreategrpformComponent;
  let fixture: ComponentFixture<CreategrpformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreategrpformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreategrpformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
