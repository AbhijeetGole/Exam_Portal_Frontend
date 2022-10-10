import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserQuizService } from './user-quiz.service';

describe('UserQuizService', () => {
  let service: UserQuizService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserQuizService]
    });
    service = TestBed.inject(UserQuizService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get questions JSON', fakeAsync(() => {

    const res:any = [];

    service.getQuestionJson().subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/question');
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should get quiz JSON by id', fakeAsync(() => {

    const res:any = {};
    const id = 1;

    service.getQuizById(id).subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/quiz/' + id);
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should get quiz by id', fakeAsync(() => {

    const res:any = {};
    const id = 1;

    service.getQuizById(id).subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/quiz/' + id);
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))
});
