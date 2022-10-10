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

  it('should get the id', () => {
    service.selectedId.subscribe((id:any) => {
      expect(id).toBe('');
    })
  })

  it('should update the id', () => {
    service.setDeletedQuestionId('1');

    service.selectedId.subscribe((id:any) => {
      expect(id).toBe('1');
    })
  })
});
