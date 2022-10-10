import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate token', fakeAsync(() => {
    const loginData = {}
    const res:any = {};

    service.generateToken(loginData).subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4000/exam-portal/user/authenticate');
    tick();
    expect(req.request.method).toEqual('POST');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))
});

