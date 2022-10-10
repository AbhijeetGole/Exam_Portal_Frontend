import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [QuestionService]
    });

    service = TestBed.inject(QuestionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the questions', fakeAsync(() => {

    const res:any = [];

    service.getAllQuestions().subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/question');
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should get question by id', fakeAsync(() => {

    const res:any = {};
    const id = 1;

    service.getQuestionbyId(id).subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/question/' + id);
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should post the question', fakeAsync(() => {

    const postQuestion = {};

    service.createNewQuestion(postQuestion).subscribe((response) => {
      expect(response).toBe(postQuestion);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question');
    tick();
    expect(req.request.method).toEqual('POST');
    req.flush(postQuestion, {status: 201, statusText: 'CREATED'});
  }))

  it('should update the question', fakeAsync(() => {
    const updateQuestion = {};
    const id = 1;

    service.updateQuestion(id, updateQuestion).subscribe((response) => {
      expect(response).toBe(updateQuestion);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question/' + id);
    tick();
    expect(req.request.method).toEqual('PUT');
    req.flush(updateQuestion, {status: 201, statusText: 'CREATED'});
  }))

  it('should delete the question', fakeAsync(() => {
    const id = 1;
    const res = {};

    service.deleteQuestion(id).subscribe((response) => {
      expect(response).toBe(res);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question/' + id);
    tick();
    expect(req.request.method).toEqual('DELETE');
    req.flush(res, {status: 200, statusText: 'OK'}); 
  }))
});
