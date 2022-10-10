import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { QuizdisplayComponent } from './quizdisplay.component';

describe('QuizdisplayComponent', () => {
  let component: QuizdisplayComponent;
  let fixture: ComponentFixture<QuizdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
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
