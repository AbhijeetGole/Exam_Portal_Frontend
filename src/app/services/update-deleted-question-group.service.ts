import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeletedQuestionGroupService {

  private id = new BehaviorSubject<any>('');
  selectedId = this.id.asObservable();

  constructor() { }

  setDeletedQuestionGroupId(id: any){
    this.id.next(id);
  }
}
