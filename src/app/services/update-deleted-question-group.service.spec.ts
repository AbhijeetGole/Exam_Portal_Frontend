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

  it('should get the id', () => {
    service.selectedId.subscribe((id:any) => {
      expect(id).toBe('');
    })
  })

  it('should update the id', () => {
    service.setDeletedQuestionGroupId('1');

    service.selectedId.subscribe((id:any) => {
      expect(id).toBe('1');
    })
  })
});
