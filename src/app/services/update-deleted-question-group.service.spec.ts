import { TestBed } from '@angular/core/testing';

import { UpdateDeletedQuestionGroupService } from './update-deleted-question-group.service';

describe('UpdateDeletedQuestionGroupService', () => {
  let service: UpdateDeletedQuestionGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDeletedQuestionGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
