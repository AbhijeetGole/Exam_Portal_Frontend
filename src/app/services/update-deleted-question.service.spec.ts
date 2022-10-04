import { TestBed } from '@angular/core/testing';

import { UpdateDeletedQuestionService } from './update-deleted-question.service';

describe('UpdateDeletedQuestionService', () => {
  let service: UpdateDeletedQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDeletedQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
