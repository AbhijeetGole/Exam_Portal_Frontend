import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    });
    service = TestBed.inject(QuizService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the quizzes', fakeAsync(() => {

    const res:any = [];

    service.getAllQuizes().subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/quiz/');
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

  it('should post the quiz', fakeAsync(() => {

    const postQuestion = {};

    service.createQuiz(postQuestion).subscribe((response) => {
      expect(response).toBe(postQuestion);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/quiz/');
    tick();
    expect(req.request.method).toEqual('POST');
    req.flush(postQuestion, {status: 201, statusText: 'CREATED'});
  }))

  it('should update the quiz', fakeAsync(() => {
    const updateQuestion = {};
    const id = 1;

    service.updateQuizById(id, updateQuestion).subscribe((response) => {
      expect(response).toBe(updateQuestion);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/quiz/' + id);
    tick();
    expect(req.request.method).toEqual('PUT');
    req.flush(updateQuestion, {status: 201, statusText: 'CREATED'});
  }))

  it('should delete the quiz', fakeAsync(() => {
    const id = 1;
    const res = {};

    service.deleteQuizById(id).subscribe((response) => {
      expect(response).toBe(res);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/quiz/' + id);
    tick();
    expect(req.request.method).toEqual('DELETE');
    req.flush(res, {status: 200, statusText: 'OK'}); 
  }))
});
