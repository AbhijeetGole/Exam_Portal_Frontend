import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavbarUserComponent } from './sidenavbar-user.component';

describe('SidenavbarUserComponent', () => {
  let component: SidenavbarUserComponent;
  let fixture: ComponentFixture<SidenavbarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavbarUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
