import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDeletedQuestionService {

  private id = new BehaviorSubject<any>('');
  selectedId = this.id.asObservable();

  constructor() { }

  setDeletedQuestionId(id: any){
    this.id.next(id);
  }
}
