import { TestBed } from '@angular/core/testing';

import { QuestionSharingService } from './question-sharing.service';

describe('QuestionSharingService', () => {
  let service: QuestionSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
