import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuestionGrpService } from './question-grp.service';

describe('QuestionGrpService', () => {
  let service: QuestionGrpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [QuestionGrpService]
    });
    service = TestBed.inject(QuestionGrpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the questions', fakeAsync(() => {

    const res:any = [];

    service.getAllQuestionGroup().subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/question-group/');
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should get question by id', fakeAsync(() => {

    const res:any = {};
    const id = 1;

    service.getQuestionGroupbyId(id).subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/question-group/' + id);
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should post the question', fakeAsync(() => {

    const postQuestionGroup = {};

    service.createNewQuestionGroup(postQuestionGroup).subscribe((response) => {
      expect(response).toBe(postQuestionGroup);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question-group');
    tick();
    expect(req.request.method).toEqual('POST');
    req.flush(postQuestionGroup, {status: 201, statusText: 'CREATED'});
  }))

  it('should update the question', fakeAsync(() => {
    const updateQuestionGroup = {};
    const id = 1;

    service.updateQuestionGroup(id, updateQuestionGroup).subscribe((response) => {
      expect(response).toBe(updateQuestionGroup);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question-group/' + id);
    tick();
    expect(req.request.method).toEqual('PUT');
    req.flush(updateQuestionGroup, {status: 201, statusText: 'CREATED'});
  }))

  it('should delete the question', fakeAsync(() => {
    const id = 1;
    const res = {};

    service.deleteQuestionGroup(id).subscribe((response) => {
      expect(response).toBe(res);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/question-group/' + id);
    tick();
    expect(req.request.method).toEqual('DELETE');
    req.flush(res, {status: 200, statusText: 'OK'}); 
  }))
});
