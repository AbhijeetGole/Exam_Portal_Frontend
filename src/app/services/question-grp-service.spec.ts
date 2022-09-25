import { TestBed } from '@angular/core/testing';

import { QuestionGrpService } from './question-grp.service';

describe('QuestionGrpService', () => {
  let service: QuestionGrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionGrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
