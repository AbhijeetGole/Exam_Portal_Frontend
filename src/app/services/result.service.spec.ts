import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResultService } from './result.service';

describe('ResultService', () => {
  let service: ResultService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultService]
    });
    service = TestBed.inject(ResultService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the questions', fakeAsync(() => {

    const res:any = [];

    service.getAllResult().subscribe((response) => {
      expect(response).toBe(res)
    })
    
    const req = httpTestingController.expectOne('http://localhost:4001/result/result');
    tick();
    expect(req.request.method).toEqual('GET');
    req.flush(res, {status: 200, statusText: 'OK'});
  }))

  it('should post the question', fakeAsync(() => {

    const postQuestion = {};

    service.result(postQuestion).subscribe((response) => {
      expect(response).toBe(postQuestion);
    })

    const req = httpTestingController.expectOne('http://localhost:4001/result/result');
    tick();
    expect(req.request.method).toEqual('POST');
    req.flush(postQuestion, {status: 201, statusText: 'CREATED'});
  }))
});
